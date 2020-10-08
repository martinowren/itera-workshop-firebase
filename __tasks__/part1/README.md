# Part 1: Configuring firebase and initial connection

## Task 1: Setting up your Firebase project
The first thing we want to do is to configure your very own Firebase project! Remember that you need a google account to start this task. 

1. Head over to https://firebase.google.com/ and sign in with your Google account.
2. Create a new project, you can name it whatever you like. Google analytics can be activated if wanted, you then also need to create an analytics account. 
3. Once the Firebase project is created you should be redirected to the main console for the project. You can click around and get familiar with the different tools. We will mostly use the parts under Develop. 

ℹ️  Firebase actually provides 1 GB of free storage and quite a bit of other functionality without having to pay, which is perfect for students :) Take a look at https://firebase.google.com/pricing/ for more details

ℹ️  For more advanced users it is also possible to create new projects through the Firebase CLI. We will look at this later in the course. 

## Task 2: Create your Cloud Firestore database
We now want to setup our database that we will use for the web application.

1. Navigate to the "Cloud Firestore" selection in the left toolbar. This is type of database we will create for our solution.
2. Click the "Create database" button and choose the `start in test mode` secure rules for your cloud firestore. We will change this later once we add proper security. Also select any location where your data will be stored, we reccomend `eur3 (europe-west)`. 
3. You should now see a view with that visualizes your very own database in Cloud firestore. For more information on the things you see head over to: https://firebase.google.com/docs/firestore/using-console 

## Task 3: Create your first games collection
A database is not nothing without any data, right? Lets fix that! In our web application we have a need to store different data values such as game and rounds. Lets start up by creating a game collection manually to begin with. 

1. Click the start collection button on the Cloud Firestore console and set the Document Id to be "games". Click next. 
2. Great! We can now create the first game as a document. You can use the "Auto-ID" button for the "Document Id". 
3. We want our game to have a name. Set the first field to be "name" with type "String" and your chosen name. 
4. A game also needs an owner. Add an additional field with name owner and type map. The map should have two string fields named "displayName" and "uid". The displayName is the visual name of the owner and the eid is their unique identifier. See below for example values.
5. Save the document and view it in the console. Next we will connect it to our app. 

![Example values for the first collection](https://i.ibb.co/BPDwKr4/Screenshot-2020-10-08-at-21-00-39.png)

## Task 4: Connect the application to your Firebase database
Finally, time to actually dig into some code! We will in this task setup the firebase config so that we can communicate with our Cloud Firestore from our web application. 

## Task 5: Retreive the game from Cloud Firestore
We now have the connections up and running. Next up is to actually retreive the game document we configured in task 3. 
