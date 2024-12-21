import React from "react";
import { motion } from "framer-motion";
import { Shape as ShapeType } from "../types/game";

interface CardProps {
  shape: ShapeType;
  onClick: () => void;
  isFlipped: boolean;
}

export const Card: React.FC<CardProps> = ({ shape, onClick, isFlipped }) => {
  const Icon = shape.icon;

  // Animation variants for the card container
  const containerVariants = {
    initial: { y: 0 },
    hover: {
      y: -3,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Enhanced flip variants with more rotations and scaling
  const flipVariants = {
    unflipped: {
      rotateY: 0,
      scale: 1,
    },
    flipped: {
      rotateY: shape.matched ? 180 : [0, 360, 720, 1080, 1440, 180], // 4 full rotations + final position
      scale: [1, 1.2, 1.3, 1.2, 1.1, 1], // Scale up during rotation
      transition: {
        duration: shape.matched ? 0.8 : 0.8, // Faster rotation
        times: shape.matched ? [0, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="relative h-40 "
      style={{ perspective: "1000px" }}
      variants={containerVariants}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="w-full h-full cursor-pointer"
        onClick={onClick}
        animate={isFlipped ? "flipped" : "unflipped"}
        variants={flipVariants}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back of card (visible when not flipped) */}
        <div
          className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-4 flex items-center justify-center shadow-lg transition-opacity duration-300 ${
            isFlipped ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="text-white text-4xl">❓</div>
        </div>

        {/* Front of card (visible when flipped) */}
        <div
          className={`absolute w-full h-full backface-hidden bg-white rounded-lg p-4 flex items-center justify-center shadow-lg transition-opacity duration-300 ${
            !isFlipped ? "opacity-0" : "opacity-100"
          } ${shape.matched ? "bg-gradient-to-br from-green-100 to-green-200" : ""}`}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <Icon
            size={48}
            className={`${shape.matched ? "text-green-600" : ""} transition-all duration-300`}
            style={{ color: shape.matched ? undefined : shape.color }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
