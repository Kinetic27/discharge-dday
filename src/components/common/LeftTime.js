import React, { useState, useRef, useEffect } from 'react';
import '../../styles/LeftTime.scss';

const calcTime = (start, end) => {
    const padTo2Digits = (num, length) => num.toString().padStart(length, '0');

    const nowTime = new Date();
    const startTime = new Date(start);
    const endTime = new Date(end);

    const total = endTime - startTime;
    const diff = endTime - nowTime;

    // Date to [hh, mm, ss]
    let time = new Date(diff)
        .toISOString()
        .split('T')[1]
        .split('.')[0]
        .split(':');

    const day = padTo2Digits(Math.floor(diff / (1000 * 60 * 60 * 24)), 2);
    const percent = 100 - (diff / total) * 100;

    return {
        leftDay: day,
        hour: time[0],
        minutes: time[1],
        seconds: time[2],
        percent: Math.max(0, percent).toFixed(6),
        isEnd: percent > 100,
    };
};

const LeftTime = ({
    title,
    start = '2022-10-31',
    end = '2024-04-30 08:00:00',
}) => {
    const [time, setTime] = useState(calcTime(start, end));
    const interval = useRef(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            setTime(calcTime(start, end));

            return () => clearInterval(interval.current);
        }, 100);
    }, [start, end]);

    const getRandom = (min, max) => Math.random() * (max - min) + min;
    const randomBackground = useRef({
        backgroundPosition: `${getRandom(0, 100)}% ${getRandom(0, 100)}%`,
    });

    return (
        <>
            {!time.isEnd && (
                <div
                    className="section"
                    id="time-left"
                    style={randomBackground.current}
                >
                    <h1 className="left-title">{title}</h1>
                    <div>
                        <span className="left-text" id="left-day">
                            {time.leftDay}일,&nbsp;
                        </span>
                        <span className="left-text" id="left-time">
                            {time.hour}시간 {time.minutes}분 {time.seconds}초
                        </span>
                    </div>
                    <div className="progress-group">
                        <progress
                            className="left-progress"
                            value={time.percent}
                            min="0"
                            max="100"
                        />
                        <span className="left-percent">{time.percent}%</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default LeftTime;
