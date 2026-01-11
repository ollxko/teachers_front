import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store, type AppDispatch } from './store/store';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { RequireRole } from './components/RequireRole/RequireRole';
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
import { useEffect } from 'react';
import { loadUser } from './store/slices/authSlice';

// Компонент для перенаправления с корня
const HomeRedirect = () => {
  return <Navigate to='/news' replace />;
};

// Компонент для страницы 404
const NotFoundPage = () => {
  return <div>Страница не найдена</div>;
};

// Компонент для страницы "Доступ запрещен"
const UnauthorizedPage = () => {
  return <div>У вас нет прав для доступа к этой странице</div>;
};

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Публичные маршруты */}
        <Route path='/' element={<HomeRedirect />} />
        <Route path='/news' element={<News />} />
        <Route path='/news/:id' element={<NewsItem />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseItem />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<EventItem />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<CreateAccountPage />} />

        {/* Защищенные маршруты (только для авторизованных) */}
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Profile name='ФИО' />
            </RequireAuth>
          }
        />

        <Route
          path='/my-courses-events'
          element={
            <RequireAuth>
              <MyCoursesPage />
            </RequireAuth>
          }
        />

        {/* Админские маршруты */}
        <Route
          path='/admin'
          element={
            <RequireAuth>
              <RequireRole allowedRoles={['admin', 'superadmin']} fallbackPath='/unauthorized'>
                <MainAdminPage />
              </RequireRole>
            </RequireAuth>
          }
        />

        {/* Специальные страницы */}
        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
