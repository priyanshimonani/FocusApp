import React, { useState, useEffect } from 'react';

export default function Pomodoro() {
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak,setIsBreak]=useState(false);
  useEffect(() => {
    let intervalId;
    if (isRunning && seconds >= 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === -1 && isBreak) {
      clearInterval(intervalId); // Clear interval when timer reaches zero
      setSeconds(10); 
      setIsBreak(false);
    }
    else if (seconds === -1 && !isBreak) {
      clearInterval(intervalId); // Clear interval when timer reaches zero
      setSeconds(5); 
      setIsBreak(true);
    }
    return () => clearInterval(intervalId); // Cleanup on unmount or dependency change
  }, [isRunning, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    if(isBreak)
      setSeconds(5);
    else
      setSeconds(10);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const mm = Math.floor(totalSeconds / 60);
    const ss = totalSeconds % 60;
    return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  };
  return (
    <div style={{display:'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
      <h1 style={{fontFamily:"Bodoni Moda"}}>Pomodoro Timer</h1>
      <div className='cardGradient' style={{alignItems:'center', justifyContent: 'center'}}>
        <div style={{display:'flex', justifyContent:'space-around'}}>
            <label>Focus</label>
            <label>Break</label>
        </div>
        <p>{formatTime(seconds)}</p>
        <p>until break</p>
        <button onClick={startTimer} disabled={isRunning || seconds === 0}>Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
     </div>
    </div>
  );
}