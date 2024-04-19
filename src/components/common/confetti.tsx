import { useEffect, useState } from "react";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";

interface ConfettiProp {
  size: "small" | "medium" | "large";
  explode: boolean;
}

const confettiSizes = {
  small: {
    force: 0.4,
    duration: 2200,
    particleCount: 30,
    width: 400,
    colors: ["#9A0023", "#FF003C", "#AF739B", "#FAC7F3", "#F7DBF4"],
  },
  medium: {
    force: 0.6,
    duration: 2500,
    particleCount: 100,
    width: 1000,
    colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
  },
  large: {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1600,
    colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
  },
};

const Confetti = ({ size, explode }: ConfettiProp) => {
  const [isExplode, setIsExplode] = useState(false);
  const confettiConfigs = confettiSizes[size];

  useEffect(() => {
    setIsExplode(explode);
  }, [explode]);

  return <div>{isExplode && <ConfettiExplosion {...confettiConfigs} />}</div>;
};
