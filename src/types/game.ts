import { IconType } from "react-icons";

export type Shape = {
  id: string;
  type: string;
  icon: IconType;
  color: string;
  matched: boolean;
};

export type ShapeComponentType = "circle" | "square" | "triangle" | "star";

export type GameState = {
  shapes: Shape[];
  selectedShape: Shape | null;
  score: number;
  isComplete: boolean;
};
