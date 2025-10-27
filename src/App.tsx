import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import News from './pages/news-page/news-page';
import Courses from './pages/courses-page/courses-page';
import Events from './pages/events-page/events-page';
import NewsItem from './pages/news-item-page/news-item-page';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/news'} element={<News />} />
        <Route path={'/news/1'} element={<NewsItem />} />
        <Route path={'/courses'} element={<Courses />} />
        <Route path={'/events'} element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
