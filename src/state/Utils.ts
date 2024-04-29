export const polarToCartesian = (radius: number, angle: number) => {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};
