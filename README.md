# PROJECT OVERVIEW
The Eastern Washington University grants office previously used a FileMaker Pro database to manage the records for all grants submitted and received by the university. This database technology is now out of date and lacks a user-friendly way to interact with the data. The goal of this project is to migrate the data into a SQL database, along with developing a user-friendly front-end for staff to manipulate records. 
### TECHNOLOGIES
 - [Node.js](https://nodejs.org/en/) for runtime environment
 - [Express.js](https://expressjs.com/) for the backend framework
 - [React](https://reactjs.org/) for the frontend
 - [MySQL](https://www.mysql.com/) for the database

### TABLE OF CONTENTS
[Features](#features)  
[Login](#login)  
[Dashboard](#dashboard)  
[Proposals](#proposals)  
[Add Proposal](#add-proposal)  
[Reporting](#reporting)  
[Search](#search)  
[Admin](#admin)  
[Logout](#logout)  
[Project Structure](#project-structure)  
[Installation](#installation)  
[SQL Database](#sql-db)  
[Google Authentication](#google-auth)  
[Running Application](#running)    
[Future Development](#future-development)  
# FEATURES
### LOGIN
The login page allows authentication for users through their Eastern Washington University credentials. Google Sign-In is used to implement this. The setup and details are given below in the [GOOGLE AUTH](#google-auth) section of this document. 
### DASHBOARD
The dashboard displays the following: 
- A navigation bar that allows the user to move to various pages of the site as well as log out of the application.
- The number of proposals submitted during the current fiscal year (fiscal year is specified to be July 1st thru June 30th).
- The total dollar amount of funds awarded during the current fiscal year as well as the previous fiscal year.
- A pie chart displaying the funds awarded by type of proposal (The types are detailed in the legend to the left of the pie chart in the application).
### PROPOSALS
The proposals page allows the user to view all proposals that have been submitted by the school. The proposals are ordered by ID with the most recent proposal being first in the table.

The table contains a column with a "View" button for each proposal that will open a modal on-click and allow the user to edit the details of the selected proposal or delete the proposal entirely. This modal will have the same functionality as the add proposal page regarding the "Award" and "Compliance and Contracting" sections.
### ADD PROPOSAL
The add proposal page allows the user to create a new proposal and add it to the database. The "Award" and "Compliance and Contracting" sections of the proposal will only display if the user has selected "Funded" or "Additional" in the "Pre Award Status" dropdown. 
### REPORTING

The reporting page allows the user to choose the start and end date of the report, then creates tables for each Unit in the university that had proposals during that time frame. 
Within each unit, a subtotal of the amounts requested and amounts funded for each grant type is shown, as well as a total sum of those two values for the entire unit. 

### SEARCH
The search page allows the user to search for one or more proposals by the following fields:
- Proposal Number
- Title
- Investigator
- Department Number
- Department Name

As a search field is filled in, the query will be performed and any matching proposals will be displayed in a table below the search fields. The user may also edit the proposal through the modal provided by the "View" button. 
### ADMIN
The admin page allows any user designated as an admin to modify the following:
- USERS: An admin may add or remove users to the application. A name and email (the email must be an EWU institutional one) are required and the new user may be defined as an admin as well.
- DEPARTMENTS: An admin may add or modify departments.
- POC's: An admin my add or modify pre-award and post-award poc's.
- UNITS: An admin may add or modify units.
### LOGOUT
The logout button will log the user out of the application. Cookies may still exist in the browser, allowing the user to simply click on the "Login" button and automatically be logged in again. If the user exits out of the tab they will also be logged out of the application. 
# PROJECT STRUCTURE
The project has been divided into two major parts, the front-end and the back-end. The front end is everything the user sees and interacts with while the backend is the node application that facilitates communication between the React application and the database.
### FRONT-END
This portion of the application consists of the dependencies, a main App component and all of the sub-components. The sub-components have been segregated into individual directories within the *components* directory. The styles are defined in the *style.css* file within the *src* folder. 
### BACK-END
This portion of the application consists of the dependencies and the main Node application, the *index.js* file. All back-end routes have been defined in this file as well as the database connection.
# INSTALLATION
#### 1. Install Node and NPM
Go to the download page for [Node.js](https://nodejs.org/en/download/) and download the installer for the LTS version that functions on the operating system you are using. Follow the instructions provided by the installer for basic installation.

**To install the EWU Grants Manager application on your system follow the steps below.** 

**NOTE:** *You will need to setup [GOOGLE AUTH](#google-auth) and the [MySQL DB](#sql-db) before running the program.*

#### 2. Get the Code:
- Download the ZIP by selecting the green "Code" dropdown at the top of this page and then select "Download ZIP"

**OR**
- Create a new folder and run the following command from within:

`git clone https://github.com/VicShcherbert/SeniorProject-GrantsManager.git`

#### 3. Install Dependencies:
Run the following command in the root directory of the project, as well as in the *server* and *the-react-part* directories:

`npm install`

**NOTE**: *If you encounter an error you may need to run*

 `npm install --legacy-peer-deps`

If you have already setup your MySQL DB and Google Auth you may run the project by following the instructions in the [RUNNING](#running) section of this document.

If you have not setup your MySQL DB and Google Auth, continue with the steps below.

# SQL DB
To setup and connect your MySQL DB follow the steps below. This example uses AWS but you are free to use any service you prefer.

#### 1. Create DB
Go to this [AWS](https://aws.amazon.com/getting-started/hands-on/create-mysql-db/) article on creating an instance for a MySQL DB. Follow the steps to deploy an instance, download MySQL Workbench and connect to the instance. The article will detail all of these steps.
#### 2. Create Tables
The necessary statements to create the tables needed have been provided in the *createTables.sql* file in the project repository. 

Open this file in MySQL Workbench within the connection to your database instance by going to **File -> Open SQL Script** and choosing the file. 

Execute the script and click the refresh button at the top of the *SCHEMAS* window. You should now see the tables within the *Tables* directory.

#### 3. Populate Tables
As before, the necessary statements to populate the proposals table has been given in the *populateTable.sql* file.
 
 Open this script in MySQL Workbench as you did with the previous script. 

Within the single quotation marks on the first line (where the text says 'insert path here'), insert the absolute path to the *MySQL_Database.csv* (you will also find this in the project directory) on your local system.

The remainder of the tables do not currently have scripts created and will need to be manually populated. This information has been also been provided in the repository. 

#### 4. Connect Application to DB
You now need to open the Node.js application to set the connection details.

Open the *index.js* file in the *server* directory. 

You will see on line eleven through sixteen the database connection details are being set. You must change these strings to reflect the credentials you have created for your database.

**NOTE:** *It is recommended these details be extracted into a* .env *file before deploying the application. These credentials should not be hardcoded in a production environment.*

If you have already setup Google Auth you may run the project by following the instructions in the [RUNNING](#running) section of this document.

If you have not setup Google Auth, continue with the steps below.

# GOOGLE AUTH
To setup the application for authentication through google you must first register the app in the [developer portal](https://console.developers.google.com/). 

If you do not have an account, go through the steps to create one.

Follow the steps under the "Create authorization credentials" heading in this article on [integrating google sign-in](https://developers.google.com/identity/sign-in/web/sign-in) with your web application.

**NOTE:** *Make sure to specify that only those within your organization are able to access your application.*

Once you have done that, copy your newly created client id and paste it into the string that is on line 38 of the *login.js* file within the *client/the-react-part/login/* directory (replace the part that says "your-client-id-here").

You will now need to manually add your credentials into the *Users* table of the MySQL DB. Make sure to enter your EWU email, name and an id of '1' so that you are given administrative access.

If you have already followed all previous steps you may run the project by following the instructions in the [RUNNING](#running) section of this document.

If you have not setup the MySQL DB continue with the steps in that section.

# RUNNING

To run the application locally follow the steps below. You will open two terminals, one to run the backend and one to run the frontend.

#### 1. Start the Development Server
In the first terminal window move into the *server* directory of the project

Run the following command to start the server

`node index.js`

You will see a message in the terminal stating the server has successfully started.

#### 2. Start the Frontend
In the second terminal window move into the *the-react-part* directory

Run the following command to start the React project

`npm start`

The application should automatically start by opening a browser window and displaying the login page. If you have correctly followed all previous steps you may login to the application using your EWU email. After authentication through google you will be taken to the dashboard.

# FUTURE DEVELOPMENT
These features are recommendations for future development of this project.

**1. File Attachment Functionality**
The grants office has multiple files that are associated with each proposal and may have more than one of each file type. They would like to be able to access and view these files within the web application

**2. Search Function Efficiency**
The application currently queries the database for each search. Instead of doing this, all of the data could be pulled into the application and then filtered based on the user input.

**3. User Interface**
The visual features of the application could be improved upon to make it a more pleasant experience for the user.

**4. Login Security**
The current login security has a flaw where the user may alter the in-memory *id* variable to track whether someone is an admin or not. This would allow the user to gain admin access without previous approval.

**5. Credential Security**
The application currently has the database connection details hardcoded along with the google authentication client id hardcoded. These should be moved into an external file and imported as variables instead.

**6. User Input Validation**
User input validation has been partially completed but will need to be finished in the update modals that are used throughout the application.

**7. Application availability**
This application currently runs on localhost. When the application eventually launches, it will need to become accessible from computers outside the university.

**8. Archive deleted proposals**
Archiving deleted proposals for a given amount of time would be useful in the case of accidental deletion.
