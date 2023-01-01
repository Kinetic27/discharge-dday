import NowTime from '../components/feature/NowTime';
import TimeLeft from '../components/feature/DischargeInfo';
import '../styles/Main.scss';

const Main = () => {
    return (
        <div className='main-component'>
            <div className='container'>
                <NowTime />
                <TimeLeft />
            </div>
        </div>
    )
}

export default Main;