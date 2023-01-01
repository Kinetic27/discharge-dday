import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<div>sorry error</div>} />
    </Routes>
  );
};

/*
https://gongbbu.tistory.com/71
https://velog.io/@chez_bono/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%83%80%EC%9D%B4%EB%A8%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0
*/

export default App;
