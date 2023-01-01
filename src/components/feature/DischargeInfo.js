import React, { useState, useRef, useEffect } from 'react';
import '../../styles/DischargeInfo.scss';

const padTo2Digits = (num, length) => {
  return num.toString().padStart(length, '0');
}

const TimeLeft = () => {
  const startTime = useRef(new Date("2022-10-31"));
  const dischargeTime = useRef(new Date("2024-04-30")); // 전역일 설정
  const totalTime = useRef(dischargeTime.current - startTime.current);

  const nowTime = useRef(new Date());
  const diff = useRef(dischargeTime.current - nowTime.current);

  const d = useRef(Math.floor(diff.current / (1000 * 60 * 60 * 24)));
  const h = useRef(Math.floor((diff.current / (1000 * 60 * 60)) % 24));
  const m = useRef(Math.floor((diff.current / (1000 * 60)) % 60));
  const s = useRef(Math.floor(diff.current / 1000 % 60));

  const [day, setDay] = useState(padTo2Digits(d.current, 2));
  const [hour, setHour] = useState(padTo2Digits(h.current, 2));
  const [minutes, setMinutes] = useState(padTo2Digits(m.current, 2));
  const [seconds, setSeconds] = useState(padTo2Digits(s.current, 2));
  const [percent, setPercent] = useState((100 - (diff.current / totalTime.current * 100)).toFixed(6));

  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      nowTime.current = new Date();
      diff.current = dischargeTime.current - nowTime.current;

      d.current = Math.floor(diff.current / (1000 * 60 * 60 * 24));
      h.current = Math.floor((diff.current / (1000 * 60 * 60)) % 24);
      m.current = Math.floor((diff.current / (1000 * 60)) % 60);
      s.current = Math.floor(diff.current / 1000 % 60);

      setDay(padTo2Digits(d.current, 2));
      setHour(padTo2Digits(h.current, 2));
      setMinutes(padTo2Digits(m.current, 2));
      setSeconds(padTo2Digits(s.current, 2));
      setPercent((100 - (diff.current / totalTime.current * 100)).toFixed(7));
    }, 50);

    // clean-up function (컴포넌트 언마운트 시 실행됨)
    return () => clearInterval(interval.current);
  }, []);

  return (
    <div className='section' id='time-left'>
      <h1 className='left-title'>전역까지</h1>
      <div>
        <span className='left-text' id='left-day'>{day}일,&nbsp;</span>
        <span className='left-text' id='left-time'>{hour}시간 {minutes}분 {seconds}초</span>
      </div>
      <div className='progress-group'>
        <progress className="left-progress" value={percent} min="0" max="100" />
        <span className='left-percent'>{percent}%</span>
      </div>
    </div>
  );
};

export default TimeLeft;