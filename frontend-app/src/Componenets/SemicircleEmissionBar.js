import React, { useEffect, useRef } from "react";
import "./SemicircleEmissionBar.css";

const SemicircleEmissionBar = ({ emissionValue = 2.5 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height;
    const radius = Math.min(centerX, centerY) - 20;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the semicircle segments
    const colors = [
      "rgba(231, 76, 60, 1)", // Red
      "rgba(255, 164, 46, 1)", // Orange
      "rgba(46, 204, 113, 1)", // Green
      "rgba(52, 152, 219, 1)", // Blue
      "rgba(155, 89, 182, 1)", // Purple
      "rgba(241, 196, 15, 1)"  // Yellow
    ];

    colors.forEach((color, index) => {
      const startAngle = Math.PI + (index * Math.PI) / 6;
      const endAngle = Math.PI + ((index + 1) * Math.PI) / 6;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    });
     // Pointer
     const pointerAngle = Math.PI + (emissionValue / 3) * Math.PI;
     const pointerX = centerX + radius * Math.cos(pointerAngle);
     const pointerY = centerY + radius * Math.sin(pointerAngle);
 
     ctx.beginPath();
     ctx.moveTo(pointerX, pointerY);
     ctx.lineTo(pointerX - 10, pointerY - 20);
     ctx.lineTo(pointerX + 10, pointerY - 20);
     ctx.fillStyle = "black";
     ctx.fill();
     ctx.closePath();
 
     // Labels
     const labels = [0, 0.5, 1, 1.5, 2, 2.5, 3];
     labels.forEach((label, index) => {
       const labelAngle = Math.PI + index * (Math.PI / 6);
       const labelX = centerX + (radius - 30) * Math.cos(labelAngle);
       const labelY = centerY + (radius - 30) * Math.sin(labelAngle);
 
       ctx.font = "14px Arial";
       ctx.fillStyle = "black";
       ctx.textAlign = "center";
       ctx.fillText(label, labelX, labelY);
     });
   }, [emissionValue]);
 
   return (
     <div className="chart-container">
       <canvas ref={canvasRef} width={400} height={300}></canvas>
     </div>
   );
 };
 
 export default SemicircleEmissionBar;