import React from "react";
import { motion } from "framer-motion";
import { Card } from "./Card";
import { GameState } from "../types/game";
// import useSound from 'use-sound';

interface GameBoardProps {
  gameState: GameState;
  onCardClick: (shapeId: string) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onCardClick,
}) => {
  // const [playMatch] = useSound('/sounds/match.mp3');
  // const [playSelect] = useSound('/sounds/select.mp3');

  const handleCardClick = (shapeId: string) => {
    onCardClick(shapeId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-4 gap-4 p-4 bg-blue-50 rounded-xl shadow-xl"
    >
      {gameState.shapes.map((shape) => (
        <Card
          key={shape.id}
          shape={shape}
          onClick={() => !shape.matched && handleCardClick(shape.id)}
          isFlipped={shape.matched || shape.id === gameState.selectedShape?.id}
        />
      ))}
    </motion.div>
  );
};
