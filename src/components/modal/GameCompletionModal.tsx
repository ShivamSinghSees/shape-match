import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, RotateCcw } from "lucide-react";

interface GameCompletionModalProps {
  isOpen: boolean;
  score: number;
  onRestart: () => void;
}

export const GameCompletionModal: React.FC<GameCompletionModalProps> = ({
  isOpen,
  score,
  onRestart,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2] p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block p-4 bg-yellow-100 rounded-full mb-4"
              >
                <Trophy className="w-12 h-12 text-yellow-500" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-800 mb-2"
              >
                Congratulations!
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-2 mb-6"
              >
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-xl font-semibold text-gray-600">
                  Score: {score} points
                </span>
                <Star className="w-5 h-5 text-yellow-500" />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRestart}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
