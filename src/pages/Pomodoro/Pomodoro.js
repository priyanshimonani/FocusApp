import React, { useState, useEffect } from 'react';
import bellSoundFile from "./bell-ring-199839.mp3";
export default function Pomodoro() {
  const bellSound = new Audio(bellSoundFile);
  const [seconds, setSeconds] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak,setIsBreak]=useState(false);
  const totalTime = isBreak ? 5 * 60 : 25 * 60;
  useEffect(() => {
    let intervalId;
    if (isRunning && seconds >= 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === -1 && isBreak) {
      clearInterval(intervalId); // Clear interval when timer reaches zero
      bellSound.play(); 
      setSeconds(25*60); 
      setIsBreak(false);
    }
    else if (seconds === -1 && !isBreak) {
      clearInterval(intervalId); // Clear interval when timer reaches zero
      bellSound.play(); 
      setSeconds(5*60); 
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
      setSeconds(5*60);
    else
      setSeconds(25*60);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const mm = Math.floor(totalSeconds / 60);
    const ss = totalSeconds % 60;
    return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  };
  const progress = ((totalTime - seconds) / totalTime) * 100;
  return (
    <div className="container">
      <style>{`
        .time {
          font-size: 6rem;
          margin: 0.5rem 0;
          font-family: "Bodoni Moda";
        }
        .subtitle {
          color: #555;
          margin-bottom: 1rem;
        }
        .running{
        background-color: #FFFBB6;
        padding: 0.5rem 1rem;
        border-radius: 18px;
        border: 2px solid black;
        }
        .notrunning{
        border-radius: 18px;
        border: 2px solid grey;
        color: grey;
        padding: 0.5rem 1rem;
        }
        .cardGradient::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 15px;
          padding: 4px; 
          background: conic-gradient(
            black ${progress}%,
            #e0e0e0 ${progress}%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          transition: background 0.3s linear;
          pointer-events: none; 
        }
      `}
      </style>
      <label className="title">Pomodoro Timer</label>
      <div className="cardGradient card">
        <div className="label-row">
          <label className={isBreak ? "notrunning" : "running"}>Focus</label>
          <label className={isBreak ? "running" : "notrunning"}>Break</label>
        </div>
        <p className="time">{formatTime(seconds)}</p>
        <p className="subtitle">until break</p>
        <div className="btn-group">
          <button onClick={startTimer} disabled={isRunning || seconds === 0} className='running'>Start</button>
          <button onClick={pauseTimer} disabled={!isRunning} className='running'>Pause</button>
          <button onClick={resetTimer} className='running'>Reset</button>
        </div>
      </div>
    </div>
  );
}