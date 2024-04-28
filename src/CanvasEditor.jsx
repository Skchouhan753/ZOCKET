import { useEffect, useRef } from "react";
import "./App.css";


/* eslint-disable no-unused-vars */
let data = {
  caption: {
    text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
    position: {
      x: 50,
      y: 50,
    },
    max_characters_per_line: 31,
    font_size: 44,
    alignment: "left",
    text_color: "#FFFFFF",
  },
  cta: {
    text: "ShopNow",
    position: {
      x: 190,
      y: 320,
    },
    text_color: "#FFFFFF",
    background_color: "#000000",
  },
  image_mask: {
    x: 56,
    y: 442,
    width: 970,
    height: 600,
  },
  urls: {
    mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
    stroke:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
    design_pattern:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
  },
};
// console.log(data.urls.design_pattern)
function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canves = canvasRef.current;
    const ctx = canves.getContext("2d");
    
    const img = new Image();
    img.onload = () => {
      // Once the image is loaded, draw it onto the canvas
      ctx.drawImage(img, data.image_mask.x, data.image_mask.y, data.image_mask.width, data.image_mask.height)
      // ctx.drawImage(img, 56, 442, 670, 600);
    };
    img.src = data.urls.mask;


    
    const x = 550; 
    const y = 30; 
    const width = 500; 
    const height = 600; 
    const radius = 50; 
    const rotationAngle = Math.PI / 4;
 
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.stroke();
    // ctx.fillStyle = "#0369A1"; 
    // ctx.fill(); 
    // ctx.restore();

    // //Caption
    ctx.font = `${data.caption.font_size}px "Arial"`;
    ctx.textAlign = data.caption.alignment;
    ctx.fillText(
      data.caption.text,
      data.caption.position.x,
      data.caption.position.y,
    );
    // cap.fillStyle = data.caption.text_color;

    // CTA
    ctx.textAlign = data.cta.alignment;
    ctx.font = `${data.cta.font_size}px "Arial"`;

    ctx.fillText(
      data.cta.text,
      data.cta.position.x,
      data.cta.position.y,
    );
    // ctx.fillStyle = data.cta.text_color;

    // ctx.drawImage(data.urls.design_pattern, 20, 20)

  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        height={1080}
        width={1080}
        style={{ height: 400, width: 400, border: "1px solid red" }}
      ></canvas>


    </>
  );
}

export default App;
