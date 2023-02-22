import React, {useState} from 'react';
import {useEffect} from 'react';

function App() {
  let showDate = new Date("January 1, 2024 00:00");
  const [showTime, setShowTime] = useState([]);
  const [showDiscussion, setShowDiscussion] = useState(false);
  
  const meetingCountdown = () => {
    let newObjects = [];
    const today = new Date();
    const difference = showDate - today;
    
    let displayDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    let displayHours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let displayMinutes = Math.floor((difference / 1000 / 60) % 60);
    let displaySeconds = Math.floor((difference / 1000) % 60);
    
    if (displayDays < 10) displayDays = "0" + displayDays;
    if (displayHours < 10) displayHours = "0" + displayHours;
    if (displayMinutes < 10) displayMinutes = "0" + displayMinutes;
    if (displaySeconds < 10) displaySeconds = "0" + displaySeconds;

    if (difference > 0) {
      newObjects = {
        days: displayDays,
        hours: displayHours,
        minutes: displayMinutes,
        seconds: displaySeconds,
      }
    } else {
      setShowDiscussion(true);
    }
    return setShowTime(newObjects);
  }

  useEffect(() => {
    const tick = setTimeout(() => {
      meetingCountdown();
    }, 1000);
    return () => clearInterval(tick);
  });

  return (
    <div className="d-flex row justify-content-center align-content-center align-items-center vh-100 text-center">
      <h1 className="display-5 fw-bold m-3"><span className='opaque'>It's the final countdown!</span></h1>
      <div className='d-flex p-4 m-3 flex-row flex-wrap justify-content-evenly align-items-center'>
        <h3 id="nextMtg" className='fw-bold'><span className='opaque'>{showDiscussion ? 'Discussing the book at the moment 😁' : <span id='mtgString'>{showTime.days} days, {showTime.hours} hours, {showTime.minutes} minutes, <span className='pulse'>{showTime.seconds}</span> seconds</span>}</span></h3>
      </div>
    </div>
  );
}

export default App;
