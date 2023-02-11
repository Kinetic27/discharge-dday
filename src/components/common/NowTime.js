import React, { useState, useRef, useEffect } from 'react';
import '../../styles/NowTime.scss';

const getDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    let [date, time] = new Date(now.getTime() - offset * 60 * 1000)
        .toISOString()
        .split('T');

    date = date.split('-');
    time = time.split('.')[0].split(':');

    return {
        year: date[0],
        month: date[1],
        day: date[2],
        hour: time[0],
        minutes: time[1],
        seconds: time[2],
    };
};

const NowTime = () => {
    const [time, setTime] = useState(getDate());
    const interval = useRef(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            setTime(getDate());
        }, 1000);

        return () => clearInterval(interval.current);
    }, []);

    return (
        <div className="section" id="now-time">
            <h3 id="now-title">
                {time.year}년 {time.month}월 {time.day}일
            </h3>
            <h1 id="now-timer">
                {time.hour} : {time.minutes} : {time.seconds}
            </h1>
        </div>
    );
};

export default NowTime;
