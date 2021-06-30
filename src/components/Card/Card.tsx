import "./card.css";

const Card = (props: any) => (
  <div className={props.className}>{props.render()}</div>
);

export default Card;
