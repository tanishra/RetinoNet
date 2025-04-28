import { Link } from "react-router-dom";

const Card = ({ card }) => {
  return (
    <Link to={`/card/${card.id}`} className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 m-8">
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110 "
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center ">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </Link>
  );
};

export default Card;

