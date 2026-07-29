"use client";

import { useMemo, useState } from "react";
import type { Flashcard, FlashcardProgress, FlashcardRating } from "../types/study";

type FlashcardsProps = {
  cards: Flashcard[];
  progress: FlashcardProgress;
  onRate: (cardId: string, rating: FlashcardRating) => void;
};

export function Flashcards({ cards, progress, onRate }: FlashcardsProps) {
  const orderedCards = useMemo(
    () => [...cards].sort((a, b) => (progress[a.id] === "again" ? -1 : 0) - (progress[b.id] === "again" ? -1 : 0)),
    [cards, progress],
  );
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const card = orderedCards[index % orderedCards.length];

  function advance(rating: FlashcardRating) {
    onRate(card.id, rating);
    setRevealed(false);
    setIndex((current) => (current + 1) % orderedCards.length);
  }

  if (!card) return null;

  const reviewed = cards.filter((item) => progress[item.id]).length;
  const needsReview = cards.filter((item) => progress[item.id] === "again").length;

  return (
    <section className="panel flashcardPanel">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">FLASH CARDS</p>
          <h2>Active recall</h2>
        </div>
        <small>{reviewed}/{cards.length} reviewed · {needsReview} repeat</small>
      </div>

      <button className={revealed ? "flashcard revealed" : "flashcard"} onClick={() => setRevealed((value) => !value)}>
        <span>{revealed ? "ANSWER" : "PROMPT"}</span>
        <strong>{revealed ? card.back : card.front}</strong>
        {revealed && card.cue && <small>{card.cue}</small>}
        <em>{revealed ? "Rate your recall below" : "Tap to reveal"}</em>
      </button>

      {revealed && (
        <div className="ratingActions">
          <button onClick={() => advance("again")}>Again</button>
          <button onClick={() => advance("good")}>Got it</button>
        </div>
      )}
    </section>
  );
}
