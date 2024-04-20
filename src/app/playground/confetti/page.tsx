"use client";

import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

const Confetti = () => {
  const { width, height } = useWindowSize();
  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={200}
      // confettiSource={{ x: 0, y: 0, w: 0, h: 0 }}
      friction={0.99}
      wind={0}
      gravity={0.1}
      initialVelocityX={4}
      initialVelocityY={10}
      colors={[
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFEB3B",
        "#FFC107",
        "#FF9800",
        "#FF5722",
        "#795548",
      ]}
      opacity={1}
      recycle={false} // keep spawning after numberofpieces have been shown
      run={true} // run animation loop
      tweenDuration={5000} // how fast confetti is added
      // tweenFunction={}
      // drawShape={}
      onConfettiComplete={(value) => console.log("Completed: ", value)}
    />
  );
};

export default Confetti;
