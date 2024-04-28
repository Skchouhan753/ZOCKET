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

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canves = canvasRef.current;
    const ctx = canves.getContext("2d");
    
    const cap = canves.getContext("2d");
    const cta = canves.getContext("2d");

    
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
    cap.font = `${data.caption.font_size}px "Arial"`;
    cap.textAlign = data.caption.alignment;
    cap.fillText(
      data.caption.text,
      data.caption.position.x,
      data.caption.position.y,
    );
    // cap.fillStyle = data.caption.text_color;

    // CTA

    

    cta.font = `${data.cta.font_size}px "Arial"`;
    cta.textAlign = data.cta.alignment;

    cta.fillText(
      data.cta.text,
      data.cta.position.x,
      data.cta.position.y,
    );
    // cta.fillStyle = data.cta.text_color;



    




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
