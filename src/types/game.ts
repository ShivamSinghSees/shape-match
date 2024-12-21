export type Shape = {
  id: string;
  type: "circle" | "square" | "triangle" | "star";
  color: string;
  matched: boolean;
};

export type GameState = {
  shapes: Shape[];
  selectedShape: Shape | null;
  score: number;
  isComplete: boolean;
};
