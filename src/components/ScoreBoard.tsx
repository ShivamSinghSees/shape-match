import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import Confetti from "react-confetti";
import { RiResetLeftFill } from "react-icons/ri";

interface ScoreBoardProps {
  score: number;
  isComplete: boolean;
  onRestart: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  isComplete,
  onRestart,
}) => {
  const rootContainer = document.getElementById("root");
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between"
    >
      <div className="text-2xl font-bold text-purple-600">Score: {score}</div>
      {isComplete ? (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center text-yellow-500"
          >
            <Trophy className="mr-2" />
            <span className="font-bold">Game Complete!</span>
          </motion.div>
          <Confetti
            width={window.innerWidth}
            height={rootContainer?.scrollHeight}
            numberOfPieces={300}
            recycle={false}
          />
        </>
      ) : (
        <RiResetLeftFill
          className="cursor-pointer"
          size={25}
          onClick={onRestart}
        />
      )}
    </motion.div>
  );
};
