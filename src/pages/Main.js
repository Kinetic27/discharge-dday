import NowTime from '../components/common/NowTime';
import LeftTime from '../components/common/LeftTime';
import '../styles/Main.scss';

const Main = () => {
    return (
        <div className="container">
            <div className="some-blank" />
            <NowTime />
            <LeftTime title="첫 휴가까지" end="2023-01-13" />
            <LeftTime title="일병까지" end="2023-01-01 07:00" />
            <LeftTime title="상병까지" end="2023-07-01 07:00" />
            <LeftTime title="생일까지" end="2023-10-27 06:30" />
            <LeftTime title="병장까지" end="2024-01-01 07:00" />
            <LeftTime title="전역까지" end="2024-04-30 06:00" />
            <div className="some-blank" />
        </div>
    );
};

export default Main;
