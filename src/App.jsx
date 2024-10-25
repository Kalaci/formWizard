import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import Form1 from './components/form1/Form1';
import Form2 from './components/form2/Form2';
import Form3 from './components/form3/Form3';
import Cv from './components/cv/Cv';
import CvList from './components/cvList/CvList';
import CvUpdate from './components/cvUpdate/CvUpdate';

function App() {
  // console.log('App rendered');
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/personal-info" element={<Form1 />} />
      <Route path="/personal-info2" element={<Form2 />} />
      <Route path="/personal-info3" element={<Form3 />} />
      <Route path="/cv" element={<Cv />} />
      <Route path='/cv-list' element={<CvList/>} />
      <Route path='/cv-list' element={<CvList/>} />

    </Routes>
  </BrowserRouter>

  );
}

export default App;
