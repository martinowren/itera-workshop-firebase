# Part 1: Configuring Firebase and initial connection

## Task 1: Setting up your Firebase project
The first thing we want to do is to configure your very own Firebase project!

1. Head over to [Firebase](https://firebase.google.com/) and sign in with your Google account.
2. Create a new project, name it whatever you like. Google analytics can be activated if wanted, but then you also need to create an analytics account. 
3. Once the Firebase project has been created, you should be redirected to the [Firebase console](https://console.firebase.google.com/?authuser=0) for the project. You can click around and get familiar with the different tools. We will mostly use the functionalities under the "Develop" category. 

👉 **Tip:** Firebase actually provides 1 GB of free storage and quite a bit of functionality for free, which is perfect for students :) Take a look at the [Firebase Pricing Information](https://firebase.google.com/pricing/) for more details.

👉 **Tip:** For more advanced users it is also possible to create new projects through the [Firebase CLI](https://firebase.google.com/docs/cli). We will use this tool later in part 3. 

## Task 2: Setting up an anonymous sign-in method
To make things a bit easier for you, we have made some parts of the authentication ready to use in the web application. We do not need any extensive security to begin with, so we will configure the Anonymous sign-in method for our project.

1. In the [Firebase console](https://console.firebase.google.com/?authuser=0), open the "Authentication" section.
2. On the "Sign-in method" tab, click on the "Anonymous" provider and enable it.

ℹ️  Enabling this method allows us to create temporary accounts to authenticate with Firebase, making our initial setup very simple. In part 3 we will change this to use Github Authentication instead. 

## Task 3: Create your Cloud Firestore database 📚
Now we want to set up our database.

1. Navigate to the "Cloud Firestore" section in the left toolbar of the [Firebase console](https://console.firebase.google.com/?authuser=0). This is the type of database we will create for our solution.
2. Click the "Create database" button and select the `start in test mode` secure rules for your Cloud Firestore. This will allow all operations with a timed rule. We will alter the rules in part 3 to make it more secure.
3. Select any location you want your data will be stored, we recommend `eur3 (europe-west)`. 
3. You should now see a view with that visualizes your very own database in Cloud Firestore!

ℹ️ For more information you can take a look at the [Firestore Documentation](https://firebase.google.com/docs/firestore/using-console).

## Task 4: Create your first game collection
A database is nothing without any data, right? Let's fix that! In our web application we need to store different data values such as games and rounds. We will create a game collection manually to begin with. 📔

1. Click the "Start collection" button on the Cloud Firestore console and set the `Collection ID` to be "games".
2. Great! We can now create the first game as a document. You can use the "Auto-ID" button for the `Document ID`. 
3. We want our game to have a name. Set the first field to "name" with type "string" and your chosen name. 
4. A game also needs an owner. Add a field with name "owner" and type "map". The map should have two string fields named "displayName" and "uid". The `displayName` is the visual name of the owner, and the `uid` is their unique identifier. See below for example values.
5. Save the document and view it in the console. Next we will connect this to our app.

![Example values for the first collection](https://i.ibb.co/P9w3vxn/Screenshot-2020-10-09-at-13-35-22.png)

## Task 5: Connect the application to your Firebase database
Finally, time to actually dig into some code! We will now set up the Firebase config so that we can communicate with our Cloud Firestore from our web application.

1. First, we need to create a web application config in Firebase. On the "Project Overview page" you can add a new app. Choose the "Web" option marked with "</>" and give it a name of your choosing. You can leave the "Firebase hosting" option unselected, we will do that from the Firebase CLI later. 
2. On the next page we see some of the necessary scripts to connect Firebase to our web application. We are only interested in the `firebaseConfig` variable and initialization. Copy the variable contents. We have already included the script sources for you in the skeleton project. 
4. Click "Continue to console". 
5. Navigate to the file `src/firebase.ts` and update the config with the values given.
6. Start up your project again with `npm run start`, try logging in with any username, and you should then be redirected to the home page. You can check the console output for any issues, there should be a message such as `Logged in with: <username>` to validate the login.

👉 **Tip:** If you forgot to copy the values for the `firebaseConfig`, you can also view them in the settings of your app in the [Firebase console](https://console.firebase.google.com/?authuser=0).

👉 **Tip:** There is a Troubleshooting section at the bottom of this Readme with common errors and how to fix them.


## Task 6: Retrieve the game from Cloud Firestore
We now have the connections up and running. 👊  Next up is to actually retrieve the game document we configured in task 3.

1. Navigate to the file `src/game/useRealtimeGames.ts`. This is where we will add the logic to retrieve the games.

ℹ️ The `import firebase from 'firebase';` on the top of file references the Firestore npm package containing functionality we can use to retrieve documents from our Cloud Firestore. 

2. Implement a call to Firestore that retrieves the content of the games collection and adds it to state using `setGames()`. See the [official documentation](https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection) for an example of how to do this.

3. Starting the app again you should see the game you created. Well done! 👏 

👉 **Tip:** We don't need the `where`-part of the example in the documentation, since we want to fetch all of the content. The first part of the code is therefore `firebase.firestore().collection('games').get()`.

👉 **Tip:** The data we retrieve from Firebase includes many more fields that we are interested in, you can check this by using `console.log(doc)` within the code. We only need to set the id and data content like this: `const gameWithDocId = { id: doc.id , ...doc.data()} as Game;`.

👉 **Tip:** Since we are using Typescript in the project, we need to set the type of list like this: `const games: Game[] = []`.

## Troubleshooting

Are you stuck? Here are some common error messages, and how you can resolve them! Check the Developer tools console for error messages.

- `This operation is restricted to administrators only.`
This could mean you forgot to enable the anonymous sign-in method. Verify that you have done the steps of task 2.

- `Missing or insufficient permissions.` Did you remember to select `start in test mode` when creating a database? You can change it by navigating to Cloud Firestore > Rules in the Firebase Console. The rules should look something like this:
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2020, 11, 11);
    }
  }
}
```

Remember you can always ask any of the helpers from Itera or use the example solution file in path: `__solutions__/part1/useRealtimeGames.ts`.
