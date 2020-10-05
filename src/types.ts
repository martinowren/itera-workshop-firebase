export type GameID = string;
export type UserName = string;
export type DeckID = string;
export type CardID = number;

export interface Game {
    id?: GameID;
    owner: UserName; // only the owner can controll these 4 properties
    name: string;
    deckId: DeckID;

    cardTsar: UserName; // only current tsar can pass on the Card Tsar title
    // currentRoundNr: number; // incrementing this triggers the next round to start ?
    
    players?: UserName[]; // PlayerState[]; // subcollection of player state documents, only the player himself can update his own state
    
    rounds?: Round[]; // collection 
}


/*
export interface PlayerState {
    username?: UserName;
    // cardsOnHand: CardID[];
    // points: number; // Everyone can observe how the game develops so it is ok that the user tracks his own points
    // turns: Turn[]; // no one will want to add a card to a turn before knowing the black card
}
*/

export interface Turn {
    // roundId: string;
    username: UserName;
    card: CardID;
}

export interface Round {
    id?: string;
    blackCard: CardID;
    winner: UserName;
    turns: Turn[] // start without transaction, then add transaction
}

export interface Card {
    content: string;
    id: CardID;
}
// How to do distribution of cards?
//   game owner update the cards on the users hand ?

// Not needed, because we use GitHub for authentication
export interface User {
    userName: string;
}
