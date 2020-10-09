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

1. First, we need to create a web app config on Firebase. On the overview page of your project you can add a new app. Choose the web app marked with "</>" and give it a name of your choosing. You can leave the "Firebase hosting" option not selected, we will do that from the Firebase CLI later. 
2. On the next page we are able to retreive some scripts that are specific for our web application. We are interested in the "firebaseConfig" variable. Copy the variable. The script sources we have already included from NPM in the skeleton project for you. 
3. Go the file `src/firebase.ts` and update the config with your values. 
4. Start up your project again and check the console output to make sure that everything works as expected.


## Task 5: Retreive the game from Cloud Firestore
We now have the connections up and running. Next up is to actually retreive the game document we configured in task 3. So far our skeleton only allows you choose a username and does not actually retreive any data from Firebase.

1. Head into the file `src/game/useRealtimeGames.ts`, this is where we will add the logic to retreive the games in our Cloud Firestore. The games we retreive is used from our App component to render all the games from the db. 
Our goal is to retreive the documents from collection "games" from our Cloud Firestore. The `import firebase from 'firebase';` on the top of file references the firestore npm package where there is functionality we can reuse to retreive the documents. 
2. Add a call to `firebase.firestore().collection('games').get()` that creates a new game list, add the game to the setGames() and returns it from the function. 

ℹ️  See the official docs for more details: https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection 

ℹ️  Also, the document we retreive from Firebase includes many more fields that we are intrested in, you can check this by using `console.log(doc)` within the code. We only need to set the Id and the data contents of a Game. Example: `const gameWithDocId = { id: doc.id ,...doc.data()} as Game;` We set the id to doc.id and copy all the data of the document using `...doc.data`.

3. Starting the app again you should see the game you created being visable in the game list :) 

ℹ️  If you are stuck you can either ask any of the helpers from Itera or use the example solution file in path: `__solutions__/part1/useRealtimeGames.ts`.
