import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import News from './pages/news-page/News';
import Courses from './pages/Courses/Courses';
import Events from './pages/events-page/Events';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/news'} element={<News />} />
        <Route path={'/courses'} element={<Courses />} />
        <Route path={'/events'} element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
