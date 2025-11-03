import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import News from './pages/news-page/news-page';
import Courses from './pages/courses-page/courses-page';
import Events from './pages/events-page/events-page';
import Profile from './pages/profile-page/profile-page';
import MainAdmin from './pages/admin/main-admin-page/main-admin-page';
import NewsItem from './pages/news-item-page/news-item-page';
import CourseItem from './pages/course-item-page/course-item-page';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/news'} element={<News />} />
        <Route path={'/news/1'} element={<NewsItem />} />
        <Route path={'/courses'} element={<Courses />} />
        <Route path={'/courses/1'} element={<CourseItem />} />
        <Route path={'/events'} element={<Events />} />
        <Route path={'/profile'} element={<Profile name='ФИО' />} />
        <Route path={'/admin'} element={<MainAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
