import React, { useState, useRef, useEffect } from 'react';
import '../../styles/LeftTime.scss';

const calcTime = (start, end) => {
    const padTo2Digits = (num) => num.toString().padStart(2, '0');

    const startTime = new Date(start);
    const endTime = new Date(end);
    const totalTime = endTime - startTime;

    const nowTime = new Date();
    const diff = endTime - nowTime;

    const d = padTo2Digits(Math.floor(diff / (1000 * 60 * 60 * 24)));
    const h = padTo2Digits(Math.floor((diff / (1000 * 60 * 60)) % 24));
    const m = padTo2Digits(Math.floor((diff / (1000 * 60)) % 60));
    const s = padTo2Digits(Math.floor((diff / 1000) % 60));

    const percent = (100 - (diff / totalTime) * 100).toFixed(6);

    return {
        day: d,
        hour: h,
        minutes: m,
        seconds: s,
        percent: percent,
        isEnd: percent > 100,
    };
};

const getRandom = (min, max) => Math.random() * (max - min) + min;

const LeftTime = ({ title, start = '2022-10-31', end }) => {
    const [time, setTime] = useState(calcTime(start, end));
    const interval = useRef(null);
    useEffect(() => {
        interval.current = setInterval(() => {
            setTime(calcTime(start, end));

            // clean-up function (컴포넌트 언마운트 시 실행됨)
            return () => clearInterval(interval.current);
        }, 1000);
    }, [start, end]);

    return (
        <>
            {!time.isEnd && (
                <div
                    className="section"
                    id="time-left"
                    style={{
                        backgroundPosition: `1% * ${getRandom(
                            0,
                            100,
                        )} 1% * ${getRandom(0, 100)}`,
                    }}
                >
                    <h1 className="left-title">{title}</h1>
                    <div>
                        <span className="left-text" id="left-day">
                            {time.day}일,&nbsp;
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
