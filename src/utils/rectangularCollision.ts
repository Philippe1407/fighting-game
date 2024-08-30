type Rectangle = {
  position: { x: number; y: number };
  width: number;
  height: number;
};

export const RectangularCollision = (rec1: Rectangle, rec2: Rectangle) => {
  return (
    rec1.position.x + rec1.width > rec2.position.x &&
    rec1.position.x < rec2.position.x + rec2.width &&
    rec1.position.y + rec1.height > rec2.position.y &&
    rec1.position.y < rec2.position.y + rec2.height
  );
};
