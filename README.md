## Introduction

**Myenergy-ai** is an open source software developed by [Advanced Infrastructure Technology Ltd](https://www.advanced-infrastructure.co.uk/), for calculating the carbon emitted by a user while travelling. The software takes your travel data, calculates the carbon emitted and plots in on a map for better visualisation.

## Live Deploy

[Myenergy-ai](https://myenergy-ai.web.app/) to check your carbon footprint.

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

- To use Map for data visualisation you need to have a [mapbox](https://www.mapbox.com/) API KEY. To get that go to mapbox, sign in if you have an account or create one if you don't. Follow the steps and verify your email.
- After verification, scroll down to the **Default public token** and copy the token.
- Now at the `src` folder level create a **.env.local** file and inside that paste - **REACT_APP_MAPBOX_API=API_KEY**, and replace **API_KEY** with the key you have copied.
- To start the application in your local environment run

```sh
yarn start
```

## Contribution

- Raise an issue
- Add new feature
- Maintain the codebase

For more information about the policies read [this](https://github.com/myenergy-ai/myenergy-ai/blob/master/CONTRIBUTING.md).

## Platforms Supported

The application supports only [`Google Takeout data(2019 onwards)`](https://takeout.google.com/settings/takeout).
[How to download Google Takeout](https://github.com/myenergy-ai/myenergy-ai/blob/dev/README.md#How-to-Download-Google-Takeout)

We will soon add support for other platforms.

##### If you want to use application with other platforms data:

- Customise your data according to the following schema.

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
          startTimestampMs || startTimestamp: timestampFormat,
          endTimestampMs || endTimestamp: timestampFormat,
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

## How to Download Google Takeout

- Go to [Google Takeout](https://takeout.google.com/settings/takeout).
- Sign In using your account.
- Under create new export, click on **Deselect all**.
- Then, find the **Location History** option and select it.
- Click on **Next Step** button
- In this step, you can select the **Delivery Method**, **Frequency**, and **File Type**.
- Finally, click on **Create Export** button.

Read More about [application](https://myenergy-ai.github.io/myenergy-ai/).
