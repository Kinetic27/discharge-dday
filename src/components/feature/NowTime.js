import React, { useState, useRef, useEffect } from 'react';
import '../../styles/NowTime.scss';

const padNumber = (num, length) => {
  // 자릿수 맞추기
  return String(num).padStart(length, '0');
};

const NowTime = () => {
  const now = useRef(new Date());


  const [year, setYear] = useState(now.current.getFullYear());
  const [month, setMonth] = useState(padNumber(now.current.getMonth() + 1, 2));
  const [day, setDay] = useState(padNumber(now.current.getDate(), 2));

  const [hour, setHour] = useState(padNumber(now.current.getHours(), 2));
  const [min, setMin] = useState(padNumber(now.current.getMinutes(), 2));
  const [sec, setSec] = useState(padNumber(now.current.getSeconds(), 2));


  // useRef -> 로컬 변수(렌더링과 관계 없이 변경 ㄱㄴ)
  const interval = useRef(null);

  // useEffect -> 최초 마운트 시에만 실행
  useEffect(() => {
    interval.current = setInterval(() => {
      now.current = new Date();

      setYear(now.current.getFullYear());
      setMonth(padNumber(now.current.getMonth() + 1, 2));
      setDay(padNumber(now.current.getDate(), 2));

      setHour(padNumber(now.current.getHours(), 2));
      setMin(padNumber(now.current.getMinutes(), 2));
      setSec(padNumber(now.current.getSeconds(), 2));
    }, 1000);

    // clean-up function (컴포넌트 언마운트 시 실행됨)
    return () => clearInterval(interval.current);
  }, []);

  return (
    <div className='section' id='now-time'>
      <h3 id='now-title'>{year}년 {month}월 {day}일</h3>
      <h1 id='now-timer'>{hour} : {min} : {sec}</h1>
    </div>
  );
};

export default NowTime;