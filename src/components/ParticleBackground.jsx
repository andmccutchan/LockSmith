import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#000000", // Change this to match your theme
        },
        particles: {
          number: {
            value: 30, // Adjust the number of bubbles
          },
          color: {
            value: "#00aaff", // Bubble color
          },
          shape: {
            type: "circle", // Makes them round
          },
          opacity: {
            value: 0.5, // Adjust transparency
            random: true,
          },
          size: {
            value: 10, // Base size
            random: true,
          },
          move: {
            enable: true,
            speed: 2, // Adjust speed of movement
            direction: "none",
            outModes: {
              default: "out", // Bubbles reappear when they exit
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble", // Creates a cool effect when hovering
            },
          },
          modes: {
            bubble: {
              distance: 200,
              size: 15,
              duration: 2,
              opacity: 0.8,
            },
          },
        },
      }}
    />
  );
};

export default ParticleBackground;
