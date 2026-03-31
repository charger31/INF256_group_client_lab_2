//----------------------------------------------
//Name: Deck Utils
//Abstract: Instead of having a dedicated Deck component, deck utils lets us have the 
//same functionality while being able to integrate it into our game state
// A deck is just an array of cards. This lets us use these functions with any deck
// including our pot and player and computer decks if needed
//----------------------------------------------

import type { Card } from "../types/card";

export const generateDeck = (): Card[] =>
  Array.from({ length: 52 }, (_, i) => ({ value: i }));

export const shuffleDeck = (deck: Card[]): Card[] => {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [d[i], d[r]] = [d[r], d[i]];
  }
  return d;
};

// Cards 0-51: value % 13 gives rank (0 = Two, 12 = Ace)
export const getCardRank = (card: Card): number => card.value % 13;