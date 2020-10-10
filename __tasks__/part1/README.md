# Part 1: Configuring firebase and initial connection

## Task 1: Setting up your Firebase project
The first thing we want to do is to configure your very own Firebase project! Remember that you need a google account to start this task. 

1. Head over to [Firebase](https://firebase.google.com/) and sign in with your Google account.
2. Create a new project, you can name it whatever you like. Google analytics can be activated if wanted, you then also need to create an analytics account. 
3. Once the Firebase project is created you should be redirected to the [Firebase console](https://console.firebase.google.com/?authuser=0) for the project. You can click around and get familiar with the different tools. We will mostly use the functionalities under the Develop category. 

👉 **Tip:** Firebase actually provides 1 GB of free storage and quite a bit of functionality for free, which is perfect for students :) Take a look at the [Firebase Pricing Information](https://firebase.google.com/pricing/) for more details.

👉 **Tip:** For more advanced users it's also possible to create new projects through the [Firebase CLI](https://firebase.google.com/docs/cli). We will use this tool later in part 3. 

## Task 2: Setup Anonymous Sign-in method
To make things a bit easier for you we have made some parts of the authentication ready to use in web application. For this first course parts we don't need any extensive security so we will just configure the Anonymous sign-in method for our project.

1. In the [Firebase console](https://console.firebase.google.com/?authuser=0), open the Authentication section.
2. On the Sign-in Methods page, edit and enable the Anonymous sign-in provider.

ℹ️  Enabling this method allows us to create temporary accounts to authenticate with Firebase, making our initial setup very simple. We will in part 3 change this to use Github Authentication instead. 

## Task 3: Create your Cloud Firestore database 📚
We now want to setup our database that we will use for the web application.

1. Navigate to the "Cloud Firestore" selection in the left toolbar of the Firebase console](https://console.firebase.google.com/?authuser=0). This is type of database we will create for our solution.
2. Click the "Create database" button and choose the `Start in test mode` secure rules for your cloud firestore. This will allow all operations with a timed rule. We will alter the rules in part 3 to make it more secure.
3. Select any location you want your data will be stored, we reccomend `eur3 (europe-west)`. 
3. You should now see a view with that visualizes your very own database in Cloud firestore. 

ℹ️  For more information on the things you can take a look at the [Documentation](https://firebase.google.com/docs/firestore/using-console).

## Task 4: Create your first games collection
A database is not nothing without any data, right? Lets fix that! In our web application we have a need to store different data values such as game and rounds. Lets start up by creating a game collection manually to begin with. 📔

1. Click the start collection button on the Cloud Firestore console and set the Document Id to be "games".
2. Great! We can now create the first game as a document. You can use the "Auto-ID" button for the "Document Id". 
3. We want our game to have a name. Set the first field to be "name" with type "String" and your chosen name. 
4. A game also needs an owner. Add an additional field with name "owner" and type map. The map should have two string fields named "displayName" and "uid". The displayName is the visual name of the owner and the eid is their unique identifier. See below for example values.
5. Save the document and view it in the console. Next we will connect it to our app. 

![Example values for the first collection](https://i.ibb.co/P9w3vxn/Screenshot-2020-10-09-at-13-35-22.png)

## Task 5: Connect the application to your Firebase database
Finally, time to actually dig into some code! We will in this task setup the firebase config so that we can communicate with our Cloud Firestore from our web application.

1. First, we need to create a Web App config on Firebase. On the "Project Overview page" you can add a new app. Choose the web app marked with "</>" and give it a name of your choosing. You can leave the "Firebase hosting" option not selected, we will do that from the Firebase CLI later. 
2. On the next page we see some of the necesarry script to connect Firebase to our web application. We are only interested in the "firebaseConfig" variable and initalization. Copy the variable contents. The script sources we have already included from NPM in the skeleton project for you. 
4. Select Continue to console. 
5. Go the file `src/firebase.ts` and update the config with the values given. If you forgot to copy the content you can always see it again by selecting your app and going into the settings in the Firebase Console. 
6. Start up your project again with `npm run start`, try logging in with a username, you should then be redirected to the home page. You can alo check the console output for any issues, there should be a message such as `Logged in with: Anne Borg` to validate the login.


## Task 6: Retreive the game from Cloud Firestore
We now have the connections up and running. 👊  Next up is to actually retreive the game document we configured in task 3. So far our skeleton only allows you choose a username and authenticate with anonymous account. It does not actually retreive any of the games from Firebase.

1. Head into the file `src/game/useRealtimeGames.ts`, this is where we will add the logic to retreive the games in our Cloud Firestore. The games we retreive is used in the App component to render all the games from the Cloud Firestore. 

ℹ️ Our goal is to retreive the documents from collection "games" from our Cloud Firestore. The `import firebase from 'firebase';` on the top of file references the firestore npm package where there is functionality we can reuse to retreive the documents. 

2. Add a call to `firebase.firestore().collection('games').get()` that creates a new game list, adds the games to the setGames() and returns it from the function. 

See the official docs for more details: https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection 

Also, the document we retreive from Firebase includes many more fields that we are intrested in, you can check this by using `console.log(doc)` within the code. We only need to set the Id and the data contents of a Game. Example: `const gameWithDocId = { id: doc.id ,...doc.data()} as Game;` We set the id to doc.id and copy all the data of the document using `...doc.data`.

3. Starting the app again you should see the game you created being visable in the game list. Well done! 👏 

👉 **Tip:** Since we are using Typescript in the project and it requires types, we need to set the type of list like `const games: Game[] = []`.

👉 **Tip:**  Are you stuck? Did you remember to set the testing secure rules in firebase on task 3? You can alter it on the firebase console for firestore if needed. Remember you can always also ask any of the helpers from Itera or use the example solution file in path: `__solutions__/part1/useRealtimeGames.ts`.
