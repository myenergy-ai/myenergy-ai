# Myenergy-ai Documentation

Myenergy-ai is an open-source software developed by **Advanced Infrastructure Technology Ltd**, for calculating the carbon emitted by a user while traveling. The software takes your travel data, calculates the carbon emitted, and plots it on a map for better visualization.

## Set-Up

- Open terminal in the appropriate folder.
- Run this command. Make sure you are connected to the internet.

```sh
git clone https://github.com/myenergy-ai/myenergy-ai.git
```

- Then run

```sh
cd myenergy-ai.
```

- Make sure you have [NodeJS](https://nodejs.org/en/) installed, if not visit [NodeJS Download](https://nodejs.org/en/) to download it and install it with default options.
- Install [yarn](https://yarnpkg.com/), which is a package manager in your local environment with

```sh
npm install --global yarn.
```

- Now run this will download all the required dependencies.

```sh
yarn install
```

- To use Map for data visualization you need to have a [Mapbox](https://www.mapbox.com/) API KEY. To get that go to Mapbox, sign in if you have an account, or create one if you don't. Follow the steps and verify your email.
- After verification, scroll down to the **Default public token** and copy the token.
- Now at the `src` folder level create a **.env.local** file and inside that paste - **REACT_APP_MAPBOX_API=API_KEY**, and replace **API_KEY** with the key you have copied.
- To start the application in your local environment run

```sh
yarn start
```

## Use Application with Google Location History Data

1. Go to [Google Takeout](https://takeout.google.com/settings/takeout).
2. Sign In using your account.
3. Under create new export, click on **Deselect all**.
4. Then, find the **Location History** option and select it.
5. Click on the **Next Step** button
6. In this step, you can select the Delivery Method, Frequency, and File Type.
7. Finally, click on **Create Export** button.
8. In the downloaded **Takeout** folder, the user needs to go to the **Location History** folder, then to the **Semantic Location History** folder.
9. Now, this folder consists of the year-wise location history of the user.
10. Each year folder has the monthly location history data in JSON format.
11. Users can upload single or multiple JSON files

**`Note: We only support data after 2019.`**

## Other Data Support

If the user wants to use location history from some other service, the user needs to structure that data according to the given schemas. You can find all the related schemas below.

## Dashboard Flow

1. Landing page, use the **Get Started** button to start the process.
2. In the InputModal component, we have used file input with multiple upload options.
3. Once the data is uploaded we read all the files one by one and check whether it has the travel data, filter out other irrelevant data, and store only necessary data. Refer: `src/components/inputModal/InputModal.jsx` and `src/lib/handleReadingFiles.js`.
4. After reading all the files we filter out the mode of transport provided, get the complete data of that mode, and store it. Refer `src/constants/carbonCostInitialData.js`.
5. Next, we display the mode of transport gathered from the data and other information related to that mode of travel. We can update the name and carbon they emit based on our will. Refer `src/components/CarbonCost/CarbonCost.jsx`.
6. The next step is setting up the work hours and date ranges to exclude from the input data. We have some initial values of the working hours, you can add a new hour range by clicking on + icons and the same goes for the date range. If you mistakenly add an overlapping hour range or date range it will be merged into one unit. We even have an option that will exclude all the hours and dates filter and include all the travel data. Refer `src/components/WorkHours/WorkHours.jsx`.
7. This is the step where we calculate the carbon cost based on the mode you have used and the distance you have traveled. Firstly we filter out the travels which are out of the range you have chosen and exclude the dates which you wanted to exclude. Then we segregate the data based on the mode of transport. Then we calculate the total carbon emission by adding the carbon cost for each object. Refer `src/components/FinalResult/FinalResult.jsx`. Refer `src/lib/splitDataIntoCategories.js`.
8. You can download the final result in CSV format. Refer `src/lib/downloadFinalResult.js`.
9. You can also plot the data on the map using the data we have stored in the different categories of travel mode. Refer `src/components/MapResult/MapResult.jsx`.

## State Management

### App States:

- **Current Step (int)** - There are four steps i.e. Upload, Adjust Carbon Cost, Set Working Hours, and Download. This state stores the values of the current step.
  Error (string) - This state tracks the error in the whole app. Initially, it is set to null. Whenever any error occurs in the app, it is stored in this state.
- **Help Modal Visibility (boolean)** - This state manages the visibility of the help modal.

### Data States:

- **Location Data (array of objects)** - It stores the location data uploaded by the user. Its initial value is null. If the user cancels the second step, the state value resets to the initial value.
- **Data to Map (array of objects)** - It stores the formatted value of location data to visualize it on the map. Its initial value is also null. This value remains null till the user chooses to visualize the data in the final step.

### Carbon-Cost States:

- **Carbon Costs (array of objects)**: It stores the user-defined carbon cost value for the travel modes that are available in the data provided by the user. The initial value of this state is the same as the initial carbon cost state.
- **Initial Carbon Costs (array of objects)**: It stores the standard carbon costs values for the travel modes that are available in the data provided by the user. If we don’t have the standard value of carbon cost for some travel mode it is set to zero. Users can set this value in the Adjust Carbon Costs step.

### Working Hours States:

- **Working Times (array of objects)**:  It stores the user-defined working times. The array consists of eight objects, seven for the seven weekdays and one for the dates. The week-day objects have day names and the start time-end time of their work. The last object consists of the date ranges to exclude. Initially, the working time is set to 09:00 AM to 05:00 PM and no date ranges are excluded.
- **Include all days and times (boolean)**: If this state is set to true then the above state holds no meaning, the final carbon cost will be calculated using the whole data.

## Schema Guide

### **1. Location History Schema**

Location History Data should be according to the following format.

```js
const locationHistoryData = {
  timelineObjects: [
    {
      activitySegment: {
        startLocation: {
          latitudeE7: latitudeAndLongitudeFormat,
          longitudeE7: latitudeAndLongitudeFormat,
        },
        endLocation: {
          latitudeE7: latitudeAndLongitudeFormat,
          longitudeE7: latitudeAndLongitudeFormat,
        },
        duration: {
          startTimestampMs: timestampFormat,
          endTimestampMs: timestampFormat,
        },
        distance: distanceFormat,
        activityType: activityFormat,
      },
    },
  ],
};
```

The values should be in the following format.

- latitudeAndLongitudeFormat

  ```js
  const latitudeAndLongitudeFormat = {
    supportsDataType: ["string", "number"],
    supportsValueType: [212287569, 21.2287569, "-1109036294", "-11.09036294"],
  };
  ```

- timestampFormat

  ```js
  const timestampFormat = {
    supportsDataType: ["string", "number"],
    supportsValueType: [
      "Sat Jan 26 2019 17:54:24 GMT+0530",
      "December 17, 1995 13:24:00",
      "1995-12-17T13:24:00",
      "Number of milliseconds",
      "Unix epoch time",
    ],
  };
  ```

- distanceFormat

  ```js
  const distanceFormat = {
    supportsDataType: ["string", "number"],
    supportsValueType: ["Distance in Meters"],
  };
  ```

- activityFormat

  ```js
  const activityFormat = {
    canBeAmong: [
      "FLYING",
      "IN_BUS",
      "IN_TRAIN",
      "IN_PASSENGER_VEHICLE",
      "MOTORCYCLING",
    ],
    caseSensitive: true,
  };
  ```

### **2. Travel Mode Schema**

Travel Mode Data should be according to the following format.

```js
const modesOfTransport = [
  {
    modeName: modeNameFormat,
    travelMode: travelModeFormat,
    carbonCost: carbonCostFormat,
  },
];
```

The values should be in the following format

- modeNameFormat: This value will be used to match the activityType in the locationHistoryData passed.
  ```js
  const modeNameFormat = {
    type: "string",
    examples: ["IN_BUS", "IN_TRAIN", "FLYING", "WALKING"]
  }
  ```

- travelModeFormat: This value will be used as a display name for travel mode.
  ```js
  const travelModeFormat = {
    type: "string",
    examples: ["Bus", "Train", "Plane", "Walk"]
  }
  ```

- carbonCostFormat: This value will be used as the carbon cost of the travel mode.
  ```js
  const carbonCostFormat = {
    type: "number",
    examples: [0.105, 0.041, 0.187, 0.11]
  }
  ```

### **3. Work Hours Schema**

The working hours' data should be according to the following format.

- The workingHours array must contain exactly 8 objects.
- Each object should have 2 keys, day and workingTime.
- The 7 objects from the start represent 7 days and the workingTime of these days.
- The last object represents the day as *Exclude_Dates* and workingTime as *Dates Ranges to be excluded*.

```js
const workingHours = [
  {
    day: "Monday",
    workingTime: "0700-1900"
  }
  {
    day: "Tuesday",
    workingTime: "0700-1900"
  }
  {
    day: "Wednesday",
    workingTime: "0700-1900"
  }
  {
    day: "Thursday",
    workingTime: "0700-1900"
  }
  {
    day: "Friday",
    workingTime: "0700-1400 ; 1600-2000"
  }
  {
    day: "Saturday",
    workingTime: ""
  }
  {
    day: "Sunday",
    workingTime: ""
  }
  {
    day: "Exclude_Dates",
    workingTime: "07:00-19:00"
  }
]
```

## Data Connector SDK

Developers can add their travel data which they may have captured from their application or from another service their application may have subscribed to. The only requirement for data ingestion is that the data must be supplied in a standard format which is explained clearly in the above sections of this document.

**Note: The data passed to the below methods should be according to the schemas given above, otherwise the methods will throw *INVALID_SCHEMA_ERROR***

- ### Location History
  The following method can be used to set location history data.

  ```js
  /**
  * @description The function takes the user data and stores it for further calculations.
  * @param {Object} data The user travels data according to the schema.
  * @param {Boolean} overrideTravelData
  * @param {Boolean} overrideTravelModes
  */
  export const setTravelData = (
    data,overrideTravelData,overrideTravelModes
  )
  ```

- ### Travel Mode

  Following methods can be used to set, get and update travel modes.

  - **setTravelModes**: Sets new values of travel modes.
    
  ```js
  /**
  * @description Validates and adds the travel modes provided by the user
  * @param {[Objects]} travelModes: list of objects containing travelMode, modeName and carbonCost
  * @returns {
      true: if travelModes schema is valid and travel modes are successfully added,
      INVALID_SCHEMA_ERROR: if travelModes schema is not valid
    }
  */
  export const setTravelModes = (travelModes)
  ```

  - **updateCarbonCosts**: Updates carbon cost of existing travel mode.

  ```js
  /**
  * @description Updates the existing value of carbon cost
  * @param {Object} updatedTravelMode: object containing travelMode, modeName and carbonCost
  * @returns {
      true: if param is valid and carbon cost is successfully updated,
      INVALID_SCHEMA_ERROR: if updatedTravelMode schema is not valid
    }
  */
  export const updateCarbonCosts = (updatedTravelMode)
  ```

  - **getTravelModes**: Returns the current value of travel modes

  ```js
  /**
  * @description Getter method for travel modes
  * @returns {[Objects]}
  */
  export const getTravelModes = ()
  ```

- ### Work Hours
  Following methods can be used to set, get and update working hours.

  - **setWorkingHours**: Sets new values of working hours

  ```js
  /** 
  * @description Validates and adds the working hours provided by the user
  * @param {[Objects]} workingHours: list of objects containing day and workingHour
  * @returns {
      true: if workingHours schema is valid and working hours are successfully added,
      INVALID_SCHEMA_ERROR: if workingHours schema is not valid
    }
  */
  export const setWorkingHours = (workingHours)
  ```

  - **updateWorkingHour**: Update the existing value of the working hour 

  ```js
  /**
  * @description Updates the existing working hour
  * @param {Object} updatedWorkingHour: object containing day and workingHour
  * @returns {
      true: if param is valid and working hour is successfully updated
      INVALID_SCHEMA_ERROR: if updatedWorkingHour schema is not valid
    }
  */
  export const updateWorkingHour = (updatedWorkingHour)
  ```

  - **getWorkingHours**: Returns the current value of working hours

  ```js
    /**
  * @description Getter method for working hour
  * @returns {[Objects]}
  */
  export const getWorkingHours = ()
  ```

- ### Final Carbon Cost
  Following methods can be used to calculate total carbon cost, download the carbon cost data and convert carbon cost data to map format.

  - **calculateCarbonFootprint**: To calculate the final carbon cost

  ```js
  /**
  * @description The function returns the travelData passed by updating/adding the carbonCost to it.
  * @param {[Object]} travelData Data taken from the user.
  * @param {[Object]} travelMode The modes of transport that are required with modeName as activityType and carbonCost as the carbon the travel mode emits.
  * @returns {[Object]}
  */
  export const calculateCarbonFootprint = (travelData, travelMode)
  ```

  - **downloadData**: To download final carbon cost data

  ```js
  /**
  * @description The function starts downloading the data in CSV or JSON format.
  * @param {[Object]} carbonCostFinalData The data with all required fields to be downloaded
  * @param {Boolean} isFormatCSV download as CSV or JSON
  */
  export const downloadData = async (carbonCostFinalData, isFormatCSV = true)
  ```

  - **convertDataToMapFormat**: To convert data to map format, if the developer wants to visualize data on a map.

  ```js
    /**
  * @description The function takes the array of objects and converts it to object with key as activityType and value as [Object] Object is the travelData which has the activityType as the key.
  * @param {[Object]} updatedLocationDataWithCarbonCost Object must have an activityType and all other data like startLatitude, endLatitude...
  * @returns {Object}
  */
  export const convertDataToMapFormat = (updatedLocationDataWithCarbonCost)
  ```

- ### Reset Data

```js
/**
* The function resets all the data in the redux store to default values
*/
export const resetAllStates = ()
```

## Visualization SDK

Myenergy.ai uses kepler.gl for map visualisation. Kepler.gl is a high-performance web-based tool created by the Uber’s Visualization Team for visual exploration of large scale geospatial datasets.

- ### Customising Maps in kepler.gl through myenergy.ai: Layers
  A layer in the kepler.gl  map is a layer of visualisation that can be created, modified, and deleted according to the use case.  Kepler provides many types of layers that you can create for data analysis. Documentation on all the types of layers that are compatible can be found [here](https://docs.kepler.gl/docs/user-guides/c-types-of-layers).

  ```js
  /**
  * @description The function adds a new layer to the map.
  * @param {Object} config The config containing data, columns, style and other required config fields.
  */
  export const addLayerToMap = (config)
  ```

- ### Removing layers

  ```js
  /**
  * @description This function removes the layer whose index is passed.
  * @param {Number} index Index of the layer to remove
  * @returns nothing
  */
  export const removeLayerFromMap = (index)
  ```

- ### Removing datasets

  ```js
  /**
  * @description The function removes the uploaded datasets from the map.
  * @param {String} dataId ID of the data set. It is the by default the activityType given in the data set
  * @returns returns nothing
  */
  export const removeDataFromMap = (dataId)
  ```

- ### Adding carbon footprint data to the map
  If the developer is not aware of the configurations and the schema kepler needs to visualise data, they can pass the data object having key as activityType and value as array of objects. Each object having start and end location, start and end time, carbon footprint and other information as well. We will convert it to Kepler compatible format and display it on the map. To customise the visuals developer can pass options with different parameters. Developers can’t pass custom colours as kepler doesn’t support it. They have a predefined set of colours, you can find it [here](https://github.com/keplergl/kepler.gl/blob/master/src/constants/custom-color-ranges.js).

  ```js
  /**
  * @description The function plots the data to the map
  * @param {Object} data Object with key as activityType and value as [Object] Object with travel data
  * @param {[Object]} carbonCost Object with modeName, carbonCost and travelMode
  * @param {Object} options Optional example
  * const options = {
      tooltip: {
        "DATA_ID": ["fields_in_the_data_set",..],
      },
      filters: [
        {
          "dataId": ["data_set_name",..],
          "id": string,
          "name": ["name",..],
          "type": "range",
          "value": [min, max],
        }
      ],
      mapState: {
        "latitude": "number",
        "longitude": "number",
        "zoom": number,
      },
      mapStyle: {
        "styleType": "dark, light, Terrain",
        "visibleLayerGroups": {
          "label": boolean,
          "road": boolean,
          "border": boolean,
          "building": boolean,
          "water": boolean,
          "land": boolean,
          "3d building": boolean
        },
        "threeDBuildingColor": [
          number,..
        ],
      },
      color: [30, 150, 190],
      thickness: number,
      colorRange: {
        "name": "Uber Viz Diverging 2.5",
        "type": "DIV",
        "category": "Uber",
        "colors": [
          "#C22E00",
          "#D45F39",
          "#E68F71",
          "#F8C0AA",
          "#BAE1E2",
          "#7CC7CB",
          "#3EADB3",
          "#00939C",
        ].reverse(),
      },
      colorField: {
        "name": "data_set_field",
        "type": "field_data_type",
      }
    };
  */
  export const plotDataToMap = (data, carbonCost, options = null)
  ```

- ### Data Table
  If the uploaded GIS data has to be visualised in a form of a table, developers can invoke the below function which uses a table component to visualise the data.

  ```js
  /**
  * @description the function pops up the table with the data from the dataset with dataId
  * @param {String} dataId The id of the dataset. It is the by default the activityType given in the data set
  * @returns nothing
  */
  export const showDataSet = (dataId)
  ```

- ### Filters
  Filters are used for filtering the data uploaded in the layers section. Many times during the data analysis process, we have to filter our dataset to gain insights from it. The following functions give programmatic access to developers to create, read, update or delete filters.

  - **addFilterToMap**

  ```js
  /**
  * @description The function adds filters to the data set.
  * @param {String} dataId The id of the data set.It is the by default the activityType given in the data set
  * @returns nothing
  */
  export const addFilterToMap = (dataId)
  ```

  - **removeFilterFromMap**

  ```js
  /**
  * @description The function removes the filter of the given index.
  * @param {Number} index Index of the filter to remove.
  * @returns nothing
  */
  export const removeFilterFromMap = (index)
  ```

  - **updateFilter**
  
  ```js
  /**
  * @description The function updates the filter.
  * @param {Number} index Index of the filter to be updated
  * @param {String} props prop of filter, eg. "dataId", "name", "value"
  * @param {String} value value of the updated field
  * @param {Number} valueIndex dataId index
  * @returns nothing
  */
  export const updateFilter = (index, props, value, valueIndex)
  ```

- ### Base Map
  The basemap is the map the user sees in the background without any data. We’ve created wrapper functions for developers to set themes and the interface of the basemap as per their requirements. Some of these functions are - 

  ```js
  /**
  * @description This function adds a new custom map style.
  * @param {Object} inputStyle
  * inputStyle.url - style url e.g. `'mapbox://styles//xxxxxyyyyzzz'`
  * inputStyle.id - style id e.g. `'custom_style_1'`
  * inputStyle.style - actual mapbox style json
  * inputStyle.label - style name
  * inputStyle.accessToken - mapbox access token
  * inputStyle.icon - icon image data url
  * @param {Object} mapStyle style for the map.
  * @returns nothing
  */
  export const addNewMapStyle = (inputStyle, mapStyle)
  ```

  The base layer is provided by mapbox which is like Photoshop, for maps. To read more about how to download maps or how to create custom maps please refer to [mapbox](https://docs.mapbox.com/).

  - **Updating map style using mapconfig**

  ```js
  /**
  * @description This function updates the map style.
  * @param {Object} mapConfig new config `{visibleLayerGroups: {label: false, road: true, background: true}}`}
  * @returns nothing
  */
  export const updateMapConfig = (mapConfig)
  ```

  ```js
  /**
  * This function changes the map style.
  * @param {Object} styleType style to update the style of the map.
  * @returns nothing
  */
  export const changeMapSyle = (styleType)
  ```

  ```js
  /**
  * the function resets the config of the map to the passed one.
  * @param {Object} config The config object
  * @param {Object} options
  * {boolean} options.centerMap `default: true` if `centerMap` is set to `true` kepler.gl will
  * {boolean} options.readOnly `default: false` if `readOnly` is set to `true`
  * {boolean} options.keepExistingConfig whether to keep exiting layer filter and interaction config
  * {boolean} options.autoCreateLayers whether to automatically create layers based on dataset }
  * @returns nothing
  */
  export const resetMapConfiguration = (config, options)
  ```

  ```js
  /**
  * The function toggles to 3D mode.
  */
  export const toggle3DMode = ()
  ```

  All of the configuration is seen on the side panel. In our user research we found that users preferred a distraction free view with just the map. For this reason we created a function developers can invoke to toggle the visibility of the side panel.

  ```js
  /**
  * The function changes the visibility of the side panel.
  * @param {String} id one of `layer`, `filter`, `interaction`, `map`
  * @returns nothing
  */
  export const changeVisisbiliyOfSidePanel = (id)
  ```

## Contribution Guidelines

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

### We Develop with GitHub

We use GitHub to host code, track issues, and feature requests, as well as accept pull requests.

### We Use [GitHub Flow](https://guides.github.com/introduction/flow/index.html)

All Code Changes Happen Through Pull Requests. Pull requests are the best way to propose changes to the codebase (we use [GitHub Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

**Note: Make sure you remove irrelevant imports and console logs. If not, it may lead to errors while performing [GitHub Actions](https://github.com/myenergy-ai/myenergy-ai/actions).**

### Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [Issues](https://github.com/myenergy-ai/myenergy-ai/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](); it's that easy!

### Write bug reports with detail, background, and sample code

[This is the template](https://gist.github.com/carlo/3402842) of a bug report. Here's [another example from Andreas Larsen](https://gist.github.com/larsenwork/3f92a3adf79838abd7d6b15c5b74f7b0), a Frontend fanatic, type tinkerer, speaker supreme, and open-source optimist.

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give a sample code if you can. [My StackOverflow question](http://stackoverflow.com/q/12488905/180626) includes sample code that _anyone_ with a base R setup can run to reproduce what I was seeing
- What you expected would happen
- What happens
- Sample Input you provided
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People _love_ thorough bug reports. I'm not even kidding.

### Use a Consistent Coding Style

- Naming Convention
  - Files, classes, variables, and functions must follow the camel-case format.
  - CSS class names must be according to [BEM naming](http://getbem.com/naming/).
- 2 spaces for indentation rather than tabs
- Use [Ant Design](https://ant.design/) principles for designing.
