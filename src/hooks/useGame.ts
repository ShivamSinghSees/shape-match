import { useState, useCallback } from "react";
import { Shape, GameState } from "../types/game";

const SHAPES = ["circle", "square", "triangle", "star"] as const;
const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
];

const createInitialShapes = () => {
  const shapes: Shape[] = [];
  SHAPES.forEach((type) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    // Create pairs of shapes
    for (let i = 0; i < 2; i++) {
      shapes.push({
        id: `${type}-${i}`,
        type,
        color,
        matched: false,
      });
    }
  });
  return shapes.sort(() => Math.random() - 0.5);
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    shapes: createInitialShapes(),
    selectedShape: null,
    score: 0,
    isComplete: false,
  });

  const handleShapeClick = useCallback((shapeId: string) => {
    setGameState((prev) => {
      const clickedShape = prev.shapes.find((s) => s.id === shapeId);
      if (!clickedShape || clickedShape.matched) return prev;

      if (!prev.selectedShape) {
        return {
          ...prev,
          selectedShape: clickedShape,
        };
      }

      if (prev.selectedShape.id === shapeId) return prev;

      const isMatch =
        prev.selectedShape.type === clickedShape.type &&
        prev.selectedShape.color === clickedShape.color;

      const updatedShapes = prev.shapes.map((shape) => {
        if (
          shape.id === clickedShape.id ||
          shape.id === prev.selectedShape?.id
        ) {
          return {
            ...shape,
            matched: isMatch,
          };
        }
        return shape;
      });

      const allMatched = updatedShapes.every((shape) => shape.matched);

      return {
        shapes: updatedShapes,
        selectedShape: null,
        score: isMatch ? prev.score + 10 : prev.score,
        isComplete: allMatched,
      };
    });
  }, []);

  return {
    gameState,
    handleShapeClick,
  };
};
