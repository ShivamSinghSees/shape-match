import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X } from "lucide-react";

interface GameInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameInstructions: React.FC<GameInstructionsProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Brain className="text-purple-600 mr-2" />
                <h2 className="text-2xl font-bold text-purple-600">
                  How to Play
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-700 mb-2">Game Rules:</h3>
                <ul className="list-disc list-inside space-y-2 text-purple-800">
                  <li>Find matching pairs of cards</li>
                  <li>Click on any card to flip it</li>
                  <li>Try to remember card locations</li>
                  <li>Match all pairs to win!</li>
                </ul>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-bold text-pink-700 mb-2">Scoring:</h3>
                <p className="text-pink-800">
                  Each matched pair earns you 10 points.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold shadow-md hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Let's Play!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
