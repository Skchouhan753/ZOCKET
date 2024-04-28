/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';

const CanvasComponent = ({ templateData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [captionText, setCaptionText] = useState(templateData.caption.text);
  const [ctaText, setCtaText] = useState(templateData.cta.text);
  const [bgColor, setBgColor] = useState(templateData.caption.background_color);


  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    const renderCanvas = () => {
      const { caption, cta, image_mask, urls } = templateData;
  
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
      // Render background color
      contextRef.current.fillStyle = bgColor;
      contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
      // Render design pattern
      const patternImg = new Image();
      patternImg.src = urls.design_pattern;
      patternImg.onload = () => {
        contextRef.current.drawImage(patternImg, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
  
      // Render mask
      const maskImg = new Image();
      maskImg.src = urls.mask;
      maskImg.onload = () => {
        contextRef.current.drawImage(maskImg, image_mask.x, image_mask.y, image_mask.width, image_mask.height);
      };
  
      // Render mask stroke
      const strokeImg = new Image();
      strokeImg.src = urls.stroke;
      strokeImg.onload = () => {
        contextRef.current.drawImage(strokeImg, image_mask.x, image_mask.y, image_mask.width, image_mask.height);
      };
  
      // Render caption text
      contextRef.current.font = `${caption.font_size}px Arial`;
      contextRef.current.fillStyle = caption.text_color;
      wrapText(contextRef.current, captionText, caption.position.x, caption.position.y, 400, 40);
  
      // Render call-to-action text
      contextRef.current.font = `${cta.font_size || 30}px Arial`;
      contextRef.current.fillStyle = cta.text_color;
      const ctaWidth = contextRef.current.measureText(ctaText).width;
      const ctaX = cta.position.x - ctaWidth / 2;
      const ctaY = cta.position.y;
      contextRef.current.fillRect(ctaX - 12, ctaY - 30, ctaWidth + 24, 40);
      contextRef.current.fillStyle = '#FFFFFF';
      contextRef.current.fillText(ctaText, ctaX, ctaY + 10);
  
      // Implement masking for the image within the mask area
      contextRef.current.globalCompositeOperation = 'source-in';
      const img = new Image();
      img.src = ''; // Add URL of the selected image
      img.onload = () => {
        contextRef.current.drawImage(img, image_mask.x, image_mask.y, image_mask.width, image_mask.height);
      };
      contextRef.current.globalCompositeOperation = 'source-over';
    };
  

    renderCanvas();

    return () => {
     
    };
  }, [templateData, captionText, ctaText, bgColor]);



  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let yPos = y;
    words.forEach((word, index) => {
      const testLine = line + word + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && index > 0) {
        context.fillText(line, x, yPos);
        line = word + ' ';
        yPos += lineHeight;
      } else {
        line = testLine;
      }
    });
    context.fillText(line, x, yPos);
  };

  const handleCaptionChange = (e) => {
    setCaptionText(e.target.value);
  };

  const handleCtaChange = (e) => {
    setCtaText(e.target.value);
  };

  const handleBgColorChange = (color) => {
    setBgColor(color.hex);
  };

  return (
    <div className='container' style={{display:"flex",gap:"10px"}}>
      <canvas ref={canvasRef} width={1080} height={1080} style={{ width: '400px', height: '400px' }} />
      <div>
      
        <label>Caption:</label><br/><br/>
        <input type="text" value={captionText} onChange={handleCaptionChange} />
        <br/>
        <br/>
      
        <label>CTA</label>
        <br/>
        <input type="text" value={ctaText} onChange={handleCtaChange} />
      
        <br/>
        <br/>
        <label>Choose your Color</label><br/>
        <input type="color" value={bgColor} onChange={(e) => handleBgColorChange(e.target.value)} />
      
      </div>
     
    </div>
  );
};

export default CanvasComponent;
