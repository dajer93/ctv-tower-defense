const HORIZONTAL_MULTIPLY_RATIO = window.innerWidth / 1920;
const VERTICAL_MULTIPLY_RATIO = window.innerHeight / 1080;
const MIN_VALUE = 1;

const getScaledPx = (px: number, vertical = false): number => {
  const multiplyRatio = vertical
    ? VERTICAL_MULTIPLY_RATIO
    : HORIZONTAL_MULTIPLY_RATIO;
  const scaledValue = Math.floor(px * multiplyRatio) || MIN_VALUE;

  if (scaledValue % 1 !== 0) {
    console.warn(
      "[getScaledPx] scaled px is not round, verify flooring is acceptable in this case",
      px,
      scaledValue
    );
  }

  return scaledValue;
};

export default getScaledPx;
