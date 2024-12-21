import { useState } from "react";
import { motion } from "framer-motion";
import { GameBoard } from "./components/GameBoard";
import { ScoreBoard } from "./components/ScoreBoard";
import { GameInstructions } from "./components/modal/GameInstructionModal";
import { useGame } from "./hooks/useGame";
import { Sparkles } from "lucide-react";
import { GameCompletionModal } from "./components/modal/GameCompletionModal";

function App() {
  const { gameState, handleShapeClick, restartGame } = useGame();
  const isInstructionShown = localStorage.getItem("instructionsShown");
  const [showInstructions, setShowInstructions] = useState(!isInstructionShown);

  function handleInstructionModalClose() {
    localStorage.setItem("instructionsShown", "1");
    setShowInstructions(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col items-center justify-center p-5 md:p-8">
      <GameInstructions
        isOpen={showInstructions}
        onClose={handleInstructionModalClose}
      />
      <GameCompletionModal
        isOpen={gameState.isComplete}
        score={gameState.score}
        onRestart={restartGame}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl font-bold text-purple-600 mb-8 flex items-center"
      >
        <Sparkles className="mr-2" />
        Shape Match
      </motion.div>

      <div className="w-full max-w-2xl">
        <ScoreBoard score={gameState.score} isComplete={gameState.isComplete} />
        <GameBoard gameState={gameState} onCardClick={handleShapeClick} />
      </div>
    </div>
  );
}

export default App;
