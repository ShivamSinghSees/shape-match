import {
  FaHeart,
  FaStar,
  FaMoon,
  FaSun,
  FaCloud,
  FaLeaf,
  FaBolt,
  FaSnowflake,
  FaFire,
  FaTree,
  FaApple,
  FaCat,
  FaDog,
  FaFish,
  FaEarlybirds,
} from "react-icons/fa";

export const AVAILABLE_SHAPES = [
  { icon: FaHeart, name: "heart" },
  { icon: FaStar, name: "star" },
  { icon: FaMoon, name: "moon" },
  { icon: FaSun, name: "sun" },
  { icon: FaCloud, name: "cloud" },
  { icon: FaLeaf, name: "leaf" },
  { icon: FaBolt, name: "bolt" },
  { icon: FaSnowflake, name: "snowflake" },
  { icon: FaFire, name: "fire" },
  { icon: FaTree, name: "tree" },
  { icon: FaApple, name: "apple" },
  { icon: FaCat, name: "cat" },
  { icon: FaDog, name: "dog" },
  { icon: FaFish, name: "fish" },
  { icon: FaEarlybirds, name: "bird" },
];

export const COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEEAD", // Yellow
  "#D4A5A5", // Pink
  "#9B59B6", // Purple
  "#E67E22", // Orange
  "#2ECC71", // Emerald
  "#3498DB", // Sky Blue
];

export const getRandomShapes = (pairCount: number = 8) => {
  // Shuffle and slice the shapes array to get random shapes
  const shuffledShapes = [...AVAILABLE_SHAPES]
    .sort(() => Math.random() - 0.5)
    .slice(0, pairCount);

  const shapes: any = [];

  // Create pairs of shapes with random colors
  shuffledShapes.forEach(({ icon, name }) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    // Create a pair of identical shapes
    for (let i = 0; i < 2; i++) {
      shapes.push({
        id: `${name}-${i}`,
        type: name,
        icon,
        color,
        matched: false,
      });
    }
  });

  // Shuffle the final array of pairs
  return shapes.sort(() => Math.random() - 0.5);
};
