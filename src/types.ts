export type GameID = string;
export type DeckID = string;
export type CardID = number;

export interface Player {
    uid: GameID;
    displayName: string | null
}

export interface Game {
    id: GameID;
    name: string;
    owner: Player;
    winner?: Player;
    players: Player[];
    rounds: Round[];
}

export interface Round {
    id: string;
    cardTsar: Player;
    blackCard: CardID;
    turns: Turn[];
    showCards: boolean;
    winner: Player | null;
}

export interface Turn {
    player: Player;
    card: CardID;
}

export interface Card {
    content: string;
    id: CardID;
}
