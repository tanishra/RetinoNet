import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Card from '../HorizontalScrollCarousel/Card';

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;

export const cards = [
  {
    url: "/imgs/1.jpg",
    title: "Stage 1",
    id: 1,
  },
  {
    url: "/imgs/2.jpg",
    title: "Stage 2",
    id: 2,
  },
  {
    url: "/imgs/3.jpg",
    title: "Stage 3",
    id: 3,
  },
  {
    url: "/imgs/4.jpg",
    title: "Stage 4",
    id: 4,
  },
  {
    url: '/imgs/5.jpg',
    title: 'Stage 5',
    id: 5,
  }
];
