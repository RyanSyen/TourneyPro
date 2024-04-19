"use client";

import "../../confetti.scss";

import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const SHAPES = ["square", "triangle"];
const COLOR_DIGIT = "ABCDEF1234567890";

//! not implementing this, we are using the React Confetti Explosion package
const Confetti = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      generateConfetti();
    }
  }, [isActive]);

  const generateRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const generateConfetti = () => {
    const container = containerRef.current as HTMLElement;

    if (!container) return;

    const createConfetti = () => {
      const confetti = document.createElement("div");
      const positionX = Math.random() * window.innerWidth;
      const positionY = Math.random() * window.innerHeight;
      const rotation = Math.random() * 360;
      const size = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

      confetti.style.cssText = `
              position: absolute;
              left: ${positionX}px;
              top: ${positionY}px;
              transform: rotate(${rotation}deg);
              width: ${size}px;
              height: ${size}px;
              background-color: ${generateRandomColor()};
            `;

      confetti.classList.add("confetti", SHAPES[Math.floor(Math.random() * 3)]);

      container.appendChild(confetti);

      setTimeout(() => container.removeChild(confetti), 4000);
    };

    Array.from({ length: 50 }, createConfetti);
  };

  const triggerConfetti = () => {
    setIsActive(true);

    // reset confetti after short delay (3 secs)
    setTimeout(() => {
      setIsActive(false);
    }, 1000);
  };

  return (
    <div>
      <Button className="font-bold text-xl" onClick={triggerConfetti}>
        Trigger Confetti
      </Button>
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        ref={containerRef}
        id="confetti-container"
      ></div>
    </div>
  );
};

export default Confetti;
