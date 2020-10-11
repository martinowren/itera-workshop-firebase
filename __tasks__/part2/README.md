# Part 2: CRUD operations and real time updates

## Task 1: CRUD operations for the game object
In part 1 we retrieved the list of all games from our Cloud Firestore. In this task we will implement CRUD operations on the game object.

❓ Do you know what CRUD operations are and what each letter in the acronym stands for? If not, read more about it [here](https://www.codecademy.com/articles/what-is-crud).

ℹ️  See the official documentation for some guidelines: [Add](https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document), [Get](https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document), [Update](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data), [Delete](https://firebase.google.com/docs/firestore/manage-data/delete-data#fields)

1. Navigate to the file `src/game/game.service.ts` where we will create all of our CRUD operations. We have already created the template functions for you. 
2. Implement the `addGame` function to add the provided game and return the result.
3. Verify the `addGame` function by trying to create a new game in the app. 

    ❓ Did it appear in the list? No? Maybe check if it is stored in the Cloud Firestore database by checking the Firebase Console. How could it be that is not being shown in the list, but it's present in the database? Try a refresh of the page 🤔 

    👉 Tip: If you make a mistake, you can manually remove fields or documents in the Cloud Firestore.

4. Implement the `getGame` function to get the information of a specific game document and return the result. This function is not currently used in the game, but you can verify your result using `console.log`.

    👉 Tip: The id field of the game object is the actual id for the document in the Cloud Firestore. This means you can easily reference a specific game like this: `db.collection('games').doc(id)`.

5. Implement the `updateGame` function to update the game with the provided game data. Try editing the name of your game by clicking the pencil icon to verify your code. Remember to refresh!

6. Implement the `deleteGame` function to delete a game in the Cloud Firestore with the specific id. To verify this, try deleting your game.

## Task 2: Adding and updating rounds
We configured our games collection in part 1 manually. Cloud Firestore also allows us to set up collections using JavaScript. In this task we will do that with a "round" object used to represent information on each round within a game. 

👉 **Tip:** Take a look at the file `src/types.ts` for more information on what fields the various objects contain.

1. Navigate to `src/game/game.service.ts` where we will implement the function `addRound` to add a round object to a subcollection named "rounds" on the specified game document. Set the `timestamp` field to the current time using this function: `firebase.firestore.FieldValue.serverTimestamp()`.

    👉 **Tip:** Adding a subcollection is as simple as just calling `.collection('rounds').add( ** your round **)` on a specific document. 

    You can verify this part by joining a game you have created and clicking "Start game". Nothing will happen in your app as we're not done implementing all functionality, but if you refresh your Cloud Firestore and find the game you just started, it should have a rounds collection with a document like in the screenshot below.

    ![Screenshot from a rounds collection in Cloud Firestore](https://i.ibb.co/74GnbRy/image.png)

2. Navigate back to `src/game/game.service.ts` and implement the function `updateRound` so that it updates the specific round on the specific game with the data provided. This is fairly similar to what we did in task 1, but you will not be able to verify this until you finish task 3.

## Task 3: Get live updates of changes
Currently, we are retrieving the games only once on every application refresh. In this task we want to configure real time updates so that we immediately see modifications done by other users.

1. Navigate to `src/game/useRealtimeRounds.ts`. Implement code that listens to changes and retrieves the rounds ordered by `timeStamp`. Remember to add the retrieved rounds to state using `setGameRounds(rounds)`.

    To listen to changes we can use `onSnapshot()` on the collection. Example:
    ```typescript
    firebase.firestore()
        .collection('boats')
        .doc(boatId)
        .onSnapshot(function (querySnapshot) {
            // Retreive each element, its id and set the object list accordingly
        });
    ```

    👉 **Tip:** Use the [official documentation](https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection) to get some hints on how to handle the updates. 

2. Store your call to firestore in a variable and return it at the end of the `UseEffect` function. This is to ensure we clean up and unsubscribe from the listener.

    Example: 
    ```typescript
    const unsubscribeFromSnapshot = firebase
            .firestore()
            // Rest of your code
            ... 

    return () => unsubscribeFromSnapshot();
    ```

     It's not in the scope for this course but for more information on React effects and cleanups see the [React documentation](https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1).
     
     If you have done everything correctly this far, you should see something like the screenshot below when joining and starting a game.
     
     👉 **Tip:** There is a Troubleshooting section at the bottom of this Readme as well with common errors and how to fix them.
     
     ![Screenshot of a started game](https://i.ibb.co/1qvMMsW/image.png)
     
3. We should also listen for changes to our games collection. Navigate to `src/game/useRealtimeGames.ts` and change your code from part 1 to use `onSnapshot` like we did with rounds. Also remember to clean up subscription.

4. Test the application and check if all functionality works as expected and that changes are displayed in real time. You need a minimum of two players to finish a game. To test your app with multiple users you can open a new browser in [incognito mode](https://support.google.com/chrome/answer/95464?co=GENIE.Platform%3DDesktop&hl=en&oco=0) and log in with a new user.

    ❓ Are you having any issues? Remember that you can either ask us or get some inspiration from the solutions 😉 

Congratulations, you should now have a fully working local app! 👏  However, we are still missing some good old security, and we would also like to deploy our app to the web to share it with friends. Head on over to part 3!

## Troubleshooting

Some common mistakes and how to fix them.

- **No cards are displayed after starting a game.** Did you remember to set the id field of each round in task 3 part 1? Take a look at how you did this in `useRealtimeGames.ts`.

- **Nothing is happening when I try to play a gard.** This might mean that something is wrong with your `updateRound` function from task 2 part 2. Compare your code to the one in the `__solutions__` folder or ask us for help.

- **Something weird happened.** Try creating a new game and see if you still have issues with this one. You might have gotten your game into a corrupted state while implementing the different functions.