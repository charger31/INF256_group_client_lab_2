//----------------------------------------------
//Name: Card component
//Abstract: This component is what displays and styles our card image
//----------------------------------------------


interface Props {
  value: number;
  faceDown?: boolean;
}

const Card = ({ value, faceDown = false }: Props) => {
  const src = faceDown ? `/cards/-1.png` : `/cards/${value}.png`;

  return (
    <div>
      <img
        src={src}
        style={{ width: 90, height: 126, borderRadius: 8 }}
      />
    </div>
  );
};

export default Card;