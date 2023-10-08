<<<<<<< HEAD
Main idea:
 Create an app that the site RME team can use to better faciliate communcications between different shifts. The main tools currently used are Slack and a locally generate Excel passdown spreadsheet. The spreadsheet is posted at the end of each shift to slack. The propsed app would store the information in a database. This app would have a home page with general site info and will display alerts for  critical info from the previous shift passdown eliminating the need for the tech to search through general shift passdown for crtical info.  The app will also inculde a safety section. Currently printed copy of safety standowns and infor is posted in the shop with a sign off sheet. This app will include a safety page with the capability that will allow the tech to review and mark the standown as complete and store this inforamtion in a database as completed.  The safety page will also allow for the manager to post safety info for the site in real-time.

Components:
Home:
Handles basic site info, managers and site tech info. Page has the capabilty of adding and removing techs. This is the only location where site techs can be added or deleted using the tech editor on this page All techs that are rendered on other pages comes from here.

Passdown: This is where you can chose to search previous passdowns or create a new passdown. 

    CreatePassdown: 
    Has a top user input area for the basic shift information tech, date, time-in, and time-out. This shift informantion can be edtied up until the Submit Passdown End of Shit button is clicked then the shift info is packaged with the workorders created and posted to the database. The Add work order will allow the user to add workorders to a table, enter the workorder number and a description of the work, click the Add to Table button and the workorder will be added to the table. The table generated contains colomns with wo#, description, booked labor, status, and comments all of these fields are editalbe up until the submit passdown end of shit button is click. To edit a row click on the row and you will be able to change the data. This allows for the ability to track and edit all work during the shift. At the end of shift click the red submit end of shift passdown and all information will be sent to the database.

    SearchPassdown:
    Allows for the user to search the database of passdowns. The user can search by date, tech or a combination of date and tech. If both the tech and date are entered a informantion window will appear that contains more specific shift info time-in, time-out, and booked hours(to be added in the next version update).

This is version 1 of the RME APP, it is basic and there is much room for improvment and additions in the future be on the lookout for future version.

To run this app:
npm run server (the json.db runs on http://localhost:40000)
npm start (to start the app)





 
=======
# RME-APP
Frontend phase2 project
>>>>>>> origin/main
