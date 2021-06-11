import "./card.css";

const Card = (props: any) => {
  return <div className={props.className}>{props.render()}</div>;
};

export default Card;

