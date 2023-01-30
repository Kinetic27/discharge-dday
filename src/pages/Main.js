import NowTime from '../components/common/NowTime';
import LeftTime from '../components/common/LeftTime';
import '../styles/Main.scss';

const Main = () => {
    return (
        <div className="main-component">
            <div className="container">
                <NowTime />
                <LeftTime title="첫 휴가까지" end="2023-01-13" />
                <LeftTime title="상병까지" end="2023-07-01" />
                <LeftTime title="병장까지" end="2024-01-01" />
                <LeftTime title="전역까지" end="2024-04-30" />  
            </div>
        </div>
    );
};

export default Main;
