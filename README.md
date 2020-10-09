# Web development with Firebase 🔥
Welcome to our Firebase course 🙌. This course will help you understand some of the basic functionality of Firebase and how to use it together with a web application to create awesome stuff!

## 1 Prerequisites

### Node and Npm:
This course requires that you have node installed. Please follow the next steps if you have not installed node before.
- ✅  Download the latest stable version from https://nodejs.org.
- ✅  To verify, write `node -v` in the console application. You should see a version number returned in your console application.
- ✅  To verify that npm is also installed, write `npm -v` in the console application.

### Git:
Another requirement for running this project is Git. Please follow the guide [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install Git if you have not already.

### Google account
In order to setup and create your own Firebase project you need to have a Google account. You can sign up to one [here](https://www.google.com/account/about/).

## 2 Test that the web application starts 

### Clone the repository and install packages
- ✅  Direct yourself to the folder you want to include this project and then clone this project by typing `git clone <link to repo>` in your console application.
-  After cloning this project, remember to `cd` into the project folder. Psst. `cd` stand for change directory and is the same as opening the folder in the finder app or directory on your mac/computer).
- ✅  Run `npm install` to install the npm packages needed for the project to start. 

### Start the application
- ✅  Start the application using the command: `npm run start start`. This will run the app in the development mode. The page will reload if you make edits. You will also see any lint errors in the console.
- Did the browser open by itself? If not open [http://localhost:3000](http://localhost:3000) to view it in the browser. 
- You should now see the login window as below in the application, we won't be able to do anything else just yet. If you had any issues you should check if you completed the previus steps first and ask us if you still have issues. 

![Login window](https://i.ibb.co/9tYQtXP/Screenshot-2020-10-09-at-12-50-38.png)

### Build the application for production / deploy to Firebase
- ✅  Build the application for production using command:`npm run build` to verify that this also works fine. We will use this again later to deploy to Firebase. All the files from the build will be set in the build/ folder.
- Great! You should now be ready to start with the tasks. Read the course information below and good luck  

ℹ️  This command bundles React in production mode and optimizes the build for the best performance.

## 3 Course Information
The goal of the course is to create a game using functionality in Firebase. We have created the application skeleton and it will be up to you to connect it together with Firebase. Of course with some proper task descriptions and assistance from us if needed. 

The game that will be created is "Cards Against Developers" a more friendly and developer specific version of Cards Against Humanity. 🎮 🎲 👾

### Tasks Overview
The tasks are seperated into three different parts, where each part has goals related to the specific tasks. Each part has its own Readme file under the `__tasks__` folder for the task descriptions.

👉 Tip: If you are stuck there is a seperate `__solutions__` folder. We reccomended trying or asking us before cheating :stuck_out_tongue_winking_eye:

**Part 1 goals:**
- Create your own firebase project.
- Connect the application skeleton to your Firebase project. 

**Part 2 goals:**
- Learn how to work with Cloud Firestore.
- Code CRUD operations and realtime updates

**Part 3 goals:**
- Add authentication, secure your application
- Host your game on Firebase hosting

**Completed all the parts and eager for more? 💪**
Extra work for those who needs additional challenges: 
- Frontend work
- Avoid duplicated cards