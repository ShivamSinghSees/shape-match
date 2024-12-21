import { useState, useCallback, useEffect } from "react";
import { GameState } from "../types/game";
import { getRandomShapes } from "../utils/shapeUtils";
import { playSound } from "../utils/soundUtlis";
import {
  CARD_FLIP_SFX,
  CARD_MATCH_SFX,
  GAME_COMPLETE_SFX,
  PAIR_COUNT,
} from "../utils/constants";

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    shapes: getRandomShapes(PAIR_COUNT),
    selectedShape: null,
    score: 0,
    isComplete: false,
  });

  const [matchCheckInProgress, setMatchCheckInProgress] = useState(false);

  const restartGame = useCallback(() => {
    setGameState({
      shapes: getRandomShapes(PAIR_COUNT),
      selectedShape: null,
      score: 0,
      isComplete: false,
    });
  }, []);

  const handleShapeClick = useCallback(
    (shapeId: string) => {
      if (matchCheckInProgress) return;

      setGameState((prev) => {
        const clickedShape = prev.shapes.find((s) => s.id === shapeId);
        if (!clickedShape || clickedShape.matched) return prev;

        if (!prev.selectedShape) {
          playSound(CARD_FLIP_SFX);
          return {
            ...prev,
            selectedShape: clickedShape,
          };
        }

        if (prev.selectedShape.id === shapeId) return prev;

        const isMatch =
          prev.selectedShape.type === clickedShape.type &&
          prev.selectedShape.color === clickedShape.color;

        setMatchCheckInProgress(true);

        if (!isMatch) {
          playSound(CARD_FLIP_SFX);
          return {
            ...prev,
            selectedShape: clickedShape,
          };
        }

        const updatedShapes = prev.shapes.map((shape) => {
          if (
            shape.id === clickedShape.id ||
            shape.id === prev.selectedShape?.id
          ) {
            return {
              ...shape,
              matched: true,
            };
          }
          return shape;
        });

        const allMatched = updatedShapes.every((shape) => shape.matched);

        if (isMatch && !allMatched) {
          playSound(CARD_MATCH_SFX);
        } else if (allMatched) {
          playSound(GAME_COMPLETE_SFX);
        }

        return {
          shapes: updatedShapes,
          selectedShape: null,
          score: prev.score + 10,
          isComplete: allMatched,
        };
      });
    },
    [matchCheckInProgress]
  );

  useEffect(() => {
    if (matchCheckInProgress) {
      const timer = setTimeout(() => {
        setGameState((prev) => {
          const selectedShape = prev.selectedShape;
          if (!selectedShape) return prev;

          const matchedPair = prev.shapes.find(
            (s) =>
              s.id !== selectedShape.id &&
              s.type === selectedShape.type &&
              s.color === selectedShape.color
          );

          if (!matchedPair) {
            return {
              ...prev,
              selectedShape: null,
            };
          }

          return prev;
        });
        setMatchCheckInProgress(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [matchCheckInProgress]);

  return {
    gameState,
    handleShapeClick,
    restartGame,
  };
};
