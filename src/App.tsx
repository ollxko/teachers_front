import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import News from './pages/news-page/news-page';
import Courses from './pages/courses-page/courses-page';
import Events from './pages/events-page/events-page';
import Profile from './pages/profile-page/profile-page';
import MainAdminPage from './pages/main-admin-page/main-admin-page';
import NewsItem from './pages/news-item-page/news-item-page';
import CourseItem from './pages/course-item-page/course-item-page';
import EventItem from './pages/event-item-page/event-item-page';
import MyCoursesPage from './pages/my-courses-events/my-courses-events';
import LoginPage from './pages/login-page/login-page';
import CreateAccountPage from './pages/registration/creating-account-page/creating-account-page';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'news'} element={<News />} />
        <Route path={'news/:id'} element={<NewsItem />} />
        <Route path={'courses'} element={<Courses />} />
        <Route path={'courses/:id'} element={<CourseItem />} />
        <Route path={'events'} element={<Events />} />
        <Route path={'events/:id'} element={<EventItem />} />
        <Route path={'profile'} element={<Profile name='ФИО' />} />
        <Route path={'/admin'} element={<MainAdminPage />} />
        <Route path={'/events/1'} element={<EventItem />} />
        <Route path={'/my-courses-events'} element={<MyCoursesPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/register'} element={<CreateAccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
