import { useRef, useEffect } from 'react';

const ImageMask = ({ imageUrl, maskUrl }) => {
  const canvasRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const maskCanvas = maskRef.current;
    const maskContext = maskCanvas.getContext('2d');

    const loadImage = async () => {
      const image = new Image();
      image.src = imageUrl;
      await new Promise(resolve => {
        image.onload = resolve;
      });
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const maskImage = new Image();
      maskImage.src = maskUrl;
      await new Promise(resolve => {
        maskImage.onload = resolve;
      });
      maskContext.drawImage(maskImage, 0, 0, maskCanvas.width, maskCanvas.height);

      // Apply mask
      context.globalCompositeOperation = 'source-in';
      context.drawImage(maskCanvas, 0, 0);
    };

    loadImage();
  }, [imageUrl, maskUrl]);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
      <canvas ref={maskRef} style={{ display: 'none' }} width={500} height={500} />
    </div>
  );
};

export default ImageMask;
