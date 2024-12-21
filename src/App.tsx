// import React from "react";
import { motion } from "framer-motion";
import { GameBoard } from "./components/GameBoard";
import { ScoreBoard } from "./components/ScoreBoard";
import { useGame } from "./hooks/useGame";
import { Sparkles } from "lucide-react";

function App() {
  const { gameState, handleShapeClick } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-purple-600 mb-8 flex items-center"
      >
        <Sparkles className="mr-2" />
        Shape Matching Game
      </motion.div>

      <div className="w-full max-w-2xl">
        <ScoreBoard score={gameState.score} isComplete={gameState.isComplete} />
        <GameBoard gameState={gameState} onShapeClick={handleShapeClick} />
      </div>

      {gameState.isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-full font-bold shadow-lg hover:bg-purple-700 transition-colors"
        >
          Play Again
        </motion.button>
      )}
    </div>
  );
}

export default App;
