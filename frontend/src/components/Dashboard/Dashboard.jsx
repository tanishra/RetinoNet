import { useEffect, useState } from "react";
import SmoothScrollHero from "../Hero/SmoothScrollHero";

export const Dashboard = () => {
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarHidden(true);
      } else {
        setNavbarHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      {/* Add the Smooth Scroll Hero section here */}
      <SmoothScrollHero navbarHidden={navbarHidden} />
    </div>
  );
};
