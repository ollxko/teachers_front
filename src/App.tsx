import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, type AppDispatch } from './store/store';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { RequireRole } from './components/RequireRole/RequireRole';
import Header from './components/Header/Header';
import News from './pages/news-page/news-page';
import Courses from './pages/courses-page/courses-page';
import Events from './pages/events-page/events-page';
import NewsItem from './pages/news-item-page/news-item-page';
import CourseItem from './pages/course-item-page/course-item-page';
import EventItem from './pages/event-item-page/event-item-page';
import MyCoursesPage from './pages/my-courses-events/my-courses-events';
import LoginPage from './pages/login-page/login-page';
import CreateAccountPage from './pages/registration/creating-account-page/creating-account-page';
import { useEffect, useState, useRef } from 'react';
import {
  selectIsAuthenticated,
  updateUserFromToken,
  initializeAuth,
  selectIsLoading,
} from './store/slices/authSlice';
import { useAutoRefreshToken } from './hooks/Auth/useAutoRefreshToken';
import CreateEventPage from './pages/admin-pages/create-event/create-event-page';
import CreateCoursePage from './pages/admin-pages/create-course/create-course-page';
import CreateNewsPage from './pages/admin-pages/create-news/create-news-page';

import { message } from 'antd';
import { setStoreRef } from './api/apiClient';

const HomeRedirect = () => {
  return <Navigate to='/news' replace />;
};

const NotFoundPage = () => {
  return <div>Страница не найдена</div>;
};

const UnauthorizedPage = () => {
  return <div>У вас нет прав для доступа к этой странице</div>;
};

function AppContent() {
  const [messageInstance, messageElement] = message.useMessage();
  const [messageText, setMessage] = useState<string | null>(null);
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  useEffect(() => {
    if (messageText) {
      messageInstance.success(messageText, 5);
    }
  }, [messageText]);

  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading); // Добавьте этот селектор

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initApp = async () => {
      try {
        await dispatch(initializeAuth()).unwrap();
        setIsAppInitialized(true);
      } catch (error) {
        // Если нет сессии, все равно помечаем как инициализированное
        setIsAppInitialized(true);
        console.log('No existing session');
      }
    };

    initApp();
  }, [dispatch]);

  useAutoRefreshToken();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(updateUserFromToken());
    }
  }, [isAuthenticated, dispatch]);

  // Пока приложение не инициализировано, показываем загрузку
  if (!isAppInitialized || isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <Router>
      <Header />
      {messageElement}
      <Routes>
        <Route path='/' element={<HomeRedirect />} />
        <Route path='/news' element={<News />} />
        <Route path='/news/:id' element={<NewsItem />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseItem />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<EventItem />} />

        <Route
          path='/login'
          element={!isAuthenticated ? <LoginPage /> : <Navigate to='/news' replace />}
        />
        <Route
          path='/register'
          element={!isAuthenticated ? <CreateAccountPage /> : <Navigate to='/profile' replace />}
        />

        {/* Защищенные маршруты (только для авторизованных) */}
        <Route path='/profile' element={<RequireAuth>{<div></div>}</RequireAuth>} />

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
          path='/create-event'
          element={
            <RequireAuth>
              <RequireRole allowedRoles={['admin', 'superadmin']} fallbackPath='/unauthorized'>
                <CreateEventPage setMessage={setMessage} />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path='/create-course'
          element={
            <RequireAuth>
              <RequireRole allowedRoles={['admin', 'superadmin']} fallbackPath='/unauthorized'>
                <CreateCoursePage setMessage={setMessage} />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path='/create-news'
          element={
            <RequireAuth>
              <RequireRole allowedRoles={['admin', 'superadmin']} fallbackPath='/unauthorized'>
                <CreateNewsPage setMessage={setMessage} />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

function App() {
  useEffect(() => {
    setStoreRef(store);
  }, []);
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
