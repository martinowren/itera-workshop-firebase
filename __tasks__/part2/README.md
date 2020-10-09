# Part 2: CRUD operations and real time updates

## Task 1: CRUD operations for the game object
In part 1 we did retreive the list of all games from our Cloud Firestore. In this task however we will implement CRUD operations on the game object, that is Add, Get, Update and Delete operations. 

1. Head to the file `src/game/game.service.ts` where we will create all our CRUD Operations. We have already created the template functions for you. 
2. Edit the "addGame" function to add the provided game and return the result. 
3. Edit the "getGame" function to get the information of a specific game document and return the result. 
4. Edit the "updateGame" function to update the game with the provided game data. 
5. Edit the "deleteGame" function to delete a game in the Cloud Firestore with the specific Id. 

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

👉 Tip: Adding a subcollection is as simple as just calling `.collection('rounds').add( ** your round **)` on the specific document retreived. 

## Task 3: Create update function for the Round subcollection. 
We also want to create an update operation in order to change the Round collection on the Cloud Firestore.

1. Head to the file `src/game/game.service.ts` again and edit the function "updateRound" so that it updates the specific round on the specific game with the data provided. This is fairly similiar to what we did in task 1. 

## Task 4: Get live updates of changes to the Rounds
Edit the useRealtimeRounds.ts to retreive real time updates. 

## Task 5: Get live updates of Changes to the games
Edit the useRealtimeGames.ts to retreive real time updates.