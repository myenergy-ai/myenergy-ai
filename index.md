## DAPSI Board

Myenergy-ai is an open source software developed by **Advanced Infrastructure Technology Ltd**, for calculating the carbon emitted by a user while traveling. The software takes your travel data, calculates the carbon emitted and plots in on a map for better visualization.

### Set up DAPSI Board

1. Open terminal in the appropriate folder.
2. Run `git clone https://github.com/myenergy-ai/myenergy-ai.git`. Make sure you are connected to the internet.
3. Then run `cd myenergy-ai`.
4. Make sure you have NodeJS installed, if not visit [NodeJS Download](https://nodejs.org/en/download/) to download it and install it with default options.
5. Install yarn, which is a package manager in your local environment with `npm install --global yarn`.
6. Now run `yarn install`, this will download all the required dependencies.
7. To use Map for data visualization you need to have a mapbox API KEY. To get that go to [mapbox](https://account.mapbox.com), sign in if you have an account or create one if you don't. Follow the steps and verify your email.
8. After verification, scroll down to the **Default Public Token** and copy the token.
9. Now at the src folder level create a **.env** file and inside that paste `REACT_APP_MAPBOX_API=API_KEY`, and replace API_KEY with the key you have copied.
10. To start the application in your local environment run `yarn start`.

### Use application with Google Location History Data

1. Go to [Google Takeout](https://takeout.google.com/settings/takeout).
2. Sign In using your account.
3. Under create new export, click on **Deselect all**.
4. Then, find the **Location History** option and select it.
5. Click on **Next Step** button
6. In this step, you can select the Delivery Method, Frequency, and File Type.
7. Finally, click on **Create Export** button.

### Dashboard Flow

1. Landing page, use the Get Started button to start the process.
2. In the InputModal component we have used file input with multiple upload options.
3. Once the data is uploaded we read all the files one by one and check whether it has the travel data and filter out other irrelevant data and store only necessary data. Refer: `src/components/inputModal/InputModal.jsx` and `src/lib/handleReadingFiles.js`.
4. After reading all the files we filter out the mode of transport provided, get the complete data of that mode and store it. Refer `src/constants/carbonCostInitialData.js`.
5. Next we display the mode of transport gathered from the data and other information related to that mode of travel. We can update the name and carbon they emit based on our will. Refer `src/components/CarbonCost/CarbonCost.jsx`.
6. The next step is setting up the work hours and date ranges to exclude from the input data. We have some initial values of the working hours, you can add a new hour range by clicking on + icons and the same goes for the date range. If you mistakenly add an overlapping hour range or date range it will be merged into one unit. We even have an option which will exclude all the hours and dates filter and include all the travel data. Refer `src/components/WorkHours/WorkHours.jsx`.
7. This is the step where we calculate the carbon cost based on the mode you have used and the distance you have traveled. Firstly we filter out the travels which are out of the range you have chosen and exclude the dates which you wanted to exclude. Then we segregate the data based on the mode of transport. Then we calculate the total carbon emission by adding the carbon cost for each object. Refer `src/components/FinalResult/FinalResult.jsx`. Refer `src/lib/splitDataIntoCategories.js`.
8. You can download the final result in csv format. Refer `src/lib/downloadFinalResult.js`.
9. You can also plot the data on the map using the data we have stored in the different categories of travel mode. Refer `src/components/MapResult/MapResult.jsx`.

```markdown
Note:

- We only support data after 2019. 
- In the downloaded Takeout folder, user needs to go to Location History folder, then to Semantic Location History folder. 
- Now this folder consists of year wise location history of the user.
- Each year folder has the monthly location history data in json format. 
- User can upload single or multiple json files.
```

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/myenergy-ai/myenergy-ai/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.
