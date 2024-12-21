import React from "react";
import { motion } from "framer-motion";
import { Shape } from "./Shape";
import { GameState } from "../types/game";
// import useSound from "use-sound";

interface GameBoardProps {
  gameState: GameState;
  onShapeClick: (shapeId: string) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onShapeClick,
}) => {
  // const [playMatch] = useSound("/sounds/match.mp3");
  // const [playSelect] = useSound("/sounds/select.mp3");

  const handleShapeClick = (shapeId: string) => {
    // playSelect();
    onShapeClick(shapeId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-4 gap-4 p-4 bg-blue-50 rounded-xl shadow-xl"
    >
      {gameState.shapes.map((shape) => (
        <Shape
          key={shape.id}
          shape={shape}
          onClick={() => handleShapeClick(shape.id)}
          isSelected={gameState.selectedShape?.id === shape.id}
        />
      ))}
    </motion.div>
  );
};
