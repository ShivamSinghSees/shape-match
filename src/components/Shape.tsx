import { motion } from "framer-motion";
import React from "react";
import { Circle, Square, Triangle, Star } from "lucide-react";
import { Shape as ShapeType } from "../types/game";

interface ShapeProps {
  shape: ShapeType;
  onClick: () => void;
  isSelected: boolean;
}

const shapeComponents = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
  star: Star,
};

export const Shape: React.FC<ShapeProps> = ({ shape, onClick, isSelected }) => {
  const ShapeComponent = shapeComponents[shape.type];

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: isSelected ? 1.1 : 1,
        rotate: shape.matched ? 360 : 0,
      }}
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg ${
        isSelected ? "bg-yellow-100" : "bg-white"
      } shadow-lg transition-colors`}
    >
      <ShapeComponent
        size={48}
        className={`${shape.matched ? "opacity-50" : ""}`}
        style={{ color: shape.color }}
      />
    </motion.div>
  );
};
