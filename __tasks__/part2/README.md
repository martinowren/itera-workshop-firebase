# Part 2: CRUD operations and real time updates

## Task 1: CRUD operations for the game object
In part 1 we retreived the list of all games from our Cloud Firestore. In this task however we will implement CRUD operations on the game object, that is Add, Get, Update and Delete operations. 

❓ Do you know what CRUD operations are and what each letter in the Acronym stands for?

1. Head to the file `src/game/game.service.ts` where we will create all our CRUD Operations. We have already created the template functions for you. 
2. Edit the "addGame" function to add the provided game and return the result.
3. Verify the "addGame" function by trying to create a new game in the app. 

❓ Did it appear in the list? No? Maybe check if it is stored in the Cloud Firestore database by checking the Firebase Console. How could it be that is not being shown in the list but it works on the database? Try a refresh of the page 🤔 

4. Edit the "getGame" function to get the information of a specific game document and return the result. 
5. Edit the "updateGame" function to update the game with the provided game data. 
6. Edit the "deleteGame" function to delete a game in the Cloud Firestore with the specific Id. 

👉 Tip: The Id field of the game object is the actual Id for the document in the Cloud Firestore DB. This means you get easily reference it in calls such as `db.collection("games).doc(GameId)`.

ℹ️  See the official documentation for some guidelines: 
- Add: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
- Get: https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
- Update: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data 
- Delete: https://firebase.google.com/docs/firestore/manage-data/delete-data#fields

TODO: Add some texts on how things should behave now. What to test?

## Task 2: Adding the Round subcollection to the Cloud Firestore
For our games collection we configured this in part 1 manually. Cloud Firestore however, being a document database, allows us to setup the collections directly from javascript. In this task we will do precisely that with our Round object that we use to represent information on each round within a game. Take a look at file `src/types.ts` for more information on what this object contains.

1. Head to the file `src/game/game.service.ts` where we will update the function addRound to add a round object to a subcollection named "rounds" on the specific game document. We want to pass a copy of the Round object and also add a field named "timestamp" using  `firebase.firestore.FieldValue.serverTimestamp()`.

👉 **Tip:** Adding a subcollection is as simple as just calling `.collection('rounds').add( ** your round **)` on the specific document retreived. 

## Task 3: Create update function for the Round subcollection. 
We also want to create an update operation in order to change the Round collection on the Cloud Firestore.

1. Head to the file `src/game/game.service.ts` again and edit the function "updateRound" so that it updates the specific round on the specific game with the data provided. This is fairly similiar to what we did in task 1. 

## Task 4: Get live updates of changes to the Rounds
In part 1 we retreived the games once on every application refresh. In the task we want to configure real time updates so that our data changes if there are any modifications done by other users. First out is the Rounds object. This holds the data required for each Round within a Game. Take a look at `src/types.ts` for what data this type contains. 

1. Open the file `src/game/useRealtimeRounds.ts`, this is where we will make our modifications. Currently there are some tiny parts of helper code, see the commented line for where to start. 
2. Add code to listen to changes and retreive the rounds ordered by timeStamp. Use the `setGameRounds(rounds);` once you have retreived them.

To listen to changes we can use the `OnSnapshot()` on the collection.

Example:
```typescript
firebase.firestore()
    .collection('boats')
    .doc(boatId)
    .onSnapshot(function (querySnapshot) {
        // Retreive each element, its Id and set the object list accordingly
    }
```

👉 **Tip:** Use the [official docs](https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection) to get some hint on how to handle the updates. 

3. Store your call to firestore in a const and return it on the end of the UseEffect function. This is to ensure we clean up and unsubscribe from the listener.  

Example: 
```typescript
const unsubscribeFromSnapshot = firebase
        .firestore()
        // Rest of your code
        ... 

return () => unsubscribeFromSnapshot();
```

 It's not in the scope for this course but for more information on React effects and cleanups see the [React docs](https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1)


## Task 5: Get live updates of Changes to the games
We should also listen for changes to our games collection so that we will see all updates from other users in real time. 

1. Open the file `src/game/useRealtimeGames.ts` and change your code you made in part 1 to use the snapshot in the same way as on task 4. 
2. Ensure that you also clean up subscription as on task 4.
3. Test the application and check if the functionality works as expected. Are you having any issues? Remember that you can either ask us or get some inpirations from the solutions 😉 

Congratulations, you should now have a fully working local app 👏  We are still however missing some good old security and we would also like to deploy our app to the web so we can share it with friends. Head on over to part 3 next. 

👉 **Tip:** To test your app with multiple users you can open a new browser in incognito mode and make a new login. The Anonymous auth will then let you have two different users at the same time. 

