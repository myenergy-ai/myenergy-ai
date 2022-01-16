# Myenery-ai Documentation

Myenergy-ai is an open source software developed by **Advanced Infrastructure Technology Ltd**, for calculating the carbon emitted by a user while traveling. The software takes your travel data, calculates the carbon emitted and plots in on a map for better visualization.

## Set Up

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

- To use Map for data visualization you need to have a [mapbox](https://www.mapbox.com/) API KEY. To get that go to mapbox, sign in if you have an account or create one if you don't. Follow the steps and verify your email.
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
5. Click on **Next Step** button
6. In this step, you can select the Delivery Method, Frequency, and File Type.
7. Finally, click on **Create Export** button.
8. In the downloaded **Takeout** folder, user needs to
   go to **Location History** folder, then to
   **Semantic Location History** folder.
9. Now this folder consists of year wise location history of the
   user. Each year folder has the monthly location history data in json format.
10. User can upload single or multiple json files from these files.

## Other Data Support:

- Customize your data according to the following schema.

```js
{
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

- Latitude And Longitude Format

```js
const latitudeAndLongitudeFormat = {
  supportsDataType: ["string", "number"],
  exampleValues: [212287569, 21.2287569, "-1109036294", "-11.09036294"],
};
```

- Timestamp Format

```js
const timestampFormat = {
  supportsDataType: ["string", "number"],
  exampleValues: [
    "Sat Jan 26 2019 17:54:24 GMT+0530",
    "December 17, 1995 13:24:00",
    "1995-12-17T13:24:00",
    "1622349967123",
    "1647329763",
  ],
};
```

- Distance Format

```js
const distanceFormat = {
  supportsDataType: ["string", "number"],
  exampleValues: ["1538"],
};
```

- Activity Type Format

```js
const activityFormat = {
  mustBeAmongst: [
    "FLYING",
    "IN_BUS",
    "IN_TRAIN",
    "IN_PASSENGER_VEHICLE",
    "MOTORCYCLING",
  ],
  caseSensitive: true,
};
```

## Dashboard Flow

1. Landing page, use the Get Started button to start the process.
2. In the InputModal component we have used file input with multiple upload options.
3. Once the data is uploaded we read all the files one by one and check whether it has the travel data and filter out other irrelevant data and store only necessary data. Refer: `src/components/inputModal/InputModal.jsx` and `src/lib/handleReadingFiles.js`.
4. After reading all the files we filter out the mode of transport provided, get the complete data of that mode and store it. Refer `src/constants/carbonCostInitialData.js`.
5. Next we display the mode of transport gathered from the data and other information related to that mode of travel. We can update the name and carbon they emit based on our will. Refer `src/components/CarbonCost/CarbonCost.jsx`.
6. The next step is setting up the work hours and date ranges to exclude from the input data. We have some initial values of the working hours, you can add a new hour range by clicking on + icons and the same goes for the date range. If you mistakenly add an overlapping hour range or date range it will be merged into one unit. We even have an option which will exclude all the hours and dates filter and include all the travel data. Refer `src/components/WorkHours/WorkHours.jsx`.
7. This is the step where we calculate the carbon cost based on the mode you have used and the distance you have traveled. Firstly we filter out the travels which are out of the range you have chosen and exclude the dates which you wanted to exclude. Then we segregate the data based on the mode of transport. Then we calculate the total carbon emission by adding the carbon cost for each object. Refer `src/components/FinalResult/FinalResult.jsx`. Refer `src/lib/splitDataIntoCategories.js`.
8. You can download the final result in csv format. Refer `src/lib/downloadFinalResult.js`.
9. You can also plot the data on the map using the data we have stored in the different categories of travel mode. Refer `src/components/MapResult/MapResult.jsx`.

### Note:

- We only support data after 2019.
- In the downloaded Takeout folder, user needs to go to Location History folder, then to Semantic Location History folder.
- Now this folder consists of year wise location history of the user.
- Each year folder has the monthly location history data in json format.
- User can upload single or multiple json files.

## State Management

### App States: 
- **Current Step (int)** - There are four steps i.e. Upload, Adjust Carbon Cost, Set Working Hours, and Download. This state stores the values of the current step.
Error (string) - This state tracks the error in the whole app. Initially, it is set to null. Whenever any error occurs in the app, it is stored in this state.
- **Help Modal Visibility (boolean)** - This state manages the visibility of the help modal.

### Data States: 
- **Location Data (array of objects)** - It stores the location data uploaded by the user. Its initial value is null. If the user cancels the second step, the state value resets to the initial value.
- **Data to Map (array of objects)** - It stores the formatted value of location data to visualize it on the map. Its initial value is also null. This value remains null till the user chooses to visualize the data in the final step.

### Carbon-Cost States:
- **Carbon Costs (array of objects)**: It stores the user defined carbon cost value for the travel modes that are available in the data provided by the user. The initial value of this state is the same as the initial carbon cost state.
- **Initial Carbon Costs (array of objects)**: It stores the standard carbon costs values for the travel modes that are available in the data provided by the user. If we don’t have the standard value of carbon cost for some travel mode it is set to zero. Users can set this value in the Adjust Carbon Costs step.

### Working Hours States:
- **Working Times (array of objects)**: It stores the user defined working times. The array consists of eight objects, seven for the seven week days and one for the dates. The week day objects have day names and the start time - end time of their work. The last object consists of the date ranges to exclude. Initially, the working time is set to 09:00 AM to 05:00 PM and no date ranges are excluded.
- **Include all days and times (boolean)**: If this state is set to true then the above state holds no meaning, the final carbon cost will be calculated using the whole data.
