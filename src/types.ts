export type GameID = string;
export type Username = string;
export type DeckID = string;
export type CardID = number;

export interface Game {
    id: GameID;
    name: string;
    owner: Username;
    winner?: Username;
    players: Username[];
    rounds: Round[];
}

export interface Round {
    id: string;
    cardTsar: Username;
    blackCard: CardID;
    turns: Turn[];
    showCards: boolean;
    winner: Username | null;
}

export interface Turn {
    username: Username;
    card: CardID;
}

export interface Card {
    content: string;
    id: CardID;
}
