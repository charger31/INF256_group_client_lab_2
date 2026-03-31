//----------------------------------------------
//Name: Player Area
//Abstract: This component is what displays the information of the player.
//----------------------------------------------


import Card from "./card";

interface Props {
  label: string;
  deckSize: number;
  currentCard: { value: number } | null;
  revealed: boolean;
}

const PlayerArea = ({ label, deckSize, currentCard, revealed }: Props) => {
  return (
    <div style={{ textAlign: "center", minWidth: 140 }}>
      <h2 style={{ marginBottom: 4 }}>{label}</h2>
      <p style={{ marginBottom: 12, color: "var(--color-text-secondary)" }}>
        {deckSize} cards remaining
      </p>

      {currentCard !== null ? (
        <Card value={currentCard.value} faceDown={!revealed} />
      ) : (
        <div
          style={{
            width: 90,
            height: 126,
            borderRadius: 8,
            border: "2px dashed var(--color-border-tertiary)",
            margin: "0 auto",
          }}
        />
      )}
    </div>
  );
};

export default PlayerArea;