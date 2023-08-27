import React, { useState } from "react";
import "./App.css";


const numSteps = 10; // Define the number of steps
const stepSize = 100 / numSteps;

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [thumbPosition, setThumbPosition] = useState(0);

  const handleThumbMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const offsetX = event.clientX - sliderContainerRef.current.getBoundingClientRect().left;
    const newPosition = Math.min(Math.max(offsetX, 0), sliderContainerRef.current.offsetWidth);

    setThumbPosition(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSliderClick = (event) => {
    const offsetX = event.clientX - sliderContainerRef.current.getBoundingClientRect().left;
    const newPosition = Math.min(Math.max(offsetX, 0), sliderContainerRef.current.offsetWidth);

    setThumbPosition(newPosition);
  };

  const sliderContainerRef = React.createRef();

  return (
    <div className="App">
      <div className="slider-container" ref={sliderContainerRef} onClick={handleSliderClick}>
        <div
          className="slider-track"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {[...Array(numSteps + 1)].map((_, index) => (
            <div
              key={index}
              className="slider-step"
              style={{ left: `${(index * stepSize)}%` }} // Adjust for step width
            >
              <div className="slider-count">{index}</div>
            </div>
          ))}
          <div
            className="slider-thumb"
            style={{ left: `${thumbPosition - 8}px` }} // Adjust for thumb width
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
