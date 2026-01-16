// import { useMemo, type JSX, useState, useEffect } from 'react';
// import './event-item-page.css';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { Tag, Typography, message, Button, List, Avatar, Spin } from 'antd';
// import {
//   CalendarOutlined,
//   FieldTimeOutlined,
//   EnvironmentOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { useEventItem } from '../../hooks/Events/useEventsItem';
// import { useEventRegistration } from '../../hooks/Events/useEventRegistration';
// import { useEventRegistrations } from '../../hooks/Events/useEventRegistrations'; // Добавьте этот импорт
// import { formatDate } from '../../utils/dateFormatter';
// import { formatTime } from '../../utils/timeFormatter';
// import { MdxRenderer } from '../../components/MdxRenderer/MdxRenderer';
// import { useSelector } from 'react-redux';
// import { hasAnyRole, selectCurrentUser } from '../../store/slices/authSlice';

// const { Title, Text } = Typography;

// type DateFormatterProps = {
//   dateString: string;
// };

// function DateFormatter({ dateString }: DateFormatterProps) {
//   const formattedDate = useMemo(() => {
//     const date = new Date(dateString.split('.').reverse().join('-'));

//     const formatted = new Intl.DateTimeFormat('ru-RU', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//       weekday: 'long',
//     }).format(date);

//     const parts = formatted.split(', ');
//     if (parts.length === 2) {
//       return `${parts[1]}, ${parts[0]}`;
//     }

//     return formatted;
//   }, [dateString]);

//   return formattedDate;
// }

// type RegisteredUser = {
//   id: string;
//   name: string;
//   email: string;
// };

// // Компонент списка участников
// function EventParticipants({ eventId }: { eventId: string }) {

//   const [registrationsWithUsers, setRegistrationsWithUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { getEventRegistrationsWithUsers } = useEventRegistrations();

//   useEffect(() => {
//     const fetchParticipants = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await getEventRegistrationsWithUsers(eventId, 100);
//         setRegistrationsWithUsers(response.items);
//         console.log(response.items);
//       } catch (err: any) {
//         const errorMessage =
//           err.response?.data?.message || 'Не удалось загрузить список участников';
//         setError(errorMessage);
//         message.error('Не удалось загрузить список участников');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (eventId) {
//       fetchParticipants();
//     }
//   }, [eventId, getEventRegistrationsWithUsers]);

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
//         <Spin />
//       </div>
//     );
//   }

//   if (error) {
//     return <div style={{ color: 'red', padding: '10px' }}>Ошибка: {error}</div>;
//   }

//   // Фильтруем только регистрации с данными пользователей
//   const registrationsWithValidUsers = registrationsWithUsers.filter(item => item.user);

//   if (registrationsWithValidUsers.length === 0) {
//     return (
//       <div style={{ padding: '20px', textAlign: 'center' }}>
//         <Text type='secondary'>На это событие еще никто не записался</Text>
//       </div>
//     );
//   }

//   return (
//     <div className='event-participants'>
//       <Title level={4} style={{ marginBottom: 16 }}>
//         Участники ({registrationsWithValidUsers.length})
//       </Title>

//       <List
//         dataSource={registrationsWithValidUsers}
//         renderItem={registration => (
//           <List.Item>
//             <List.Item.Meta
//               avatar={<Avatar icon={<UserOutlined />} />}
//               title={<Text strong>{registration.user.userName}</Text>}
//               description={
//                 <div>
//                   <div>{registration.user.email}</div>
//                   <div style={{ marginTop: 4, fontSize: '12px', color: '#888' }}>
//                     Записался: {new Date(registration.createdAt).toLocaleDateString('ru-RU')}
//                   </div>
//                 </div>
//               }
//             />
//           </List.Item>
//         )}
//         style={{ backgroundColor: '#fafafa', borderRadius: 8, padding: '0 16px' }}
//       />
//     </div>
//   );
// }

// export default function EventItem(): JSX.Element {
//   const userCheck = useSelector(selectCurrentUser);
//   const isAdmin = hasAnyRole(userCheck, ['admin', 'superadmin']);
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const { eventsItem, loading: eventLoading } = useEventItem(id);
//   const {
//     isRegistered,
//     loading: registrationLoading,
//     error: registrationError,
//     toggleRegistration,
//     userId,
//     user,
//   } = useEventRegistration(id);

//   if (registrationError) {
//     message.error(registrationError);
//   }

//   const handleRegistrationClick = async () => {
//     if (!userId || !user) {
//       message.info('Для записи на событие необходимо авторизоваться');
//       navigate('/login', { state: { from: `/events/${id}` } });
//       return;
//     }

//     try {
//       await toggleRegistration();
//       message.success(
//         isRegistered ? 'Вы успешно отменили запись на событие' : 'Вы успешно записались на событие'
//       );
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message ||
//         (isRegistered ? 'Не удалось отменить запись' : 'Не удалось записаться на событие');
//       message.error(errorMessage);
//     }
//   };

//   const displayData = eventsItem || {
//     name: 'Загрузка...',
//     description: 'Загрузка описания...',
//     date: new Date().toISOString(),
//     address: 'Адрес не указан',
//     imageUrl: '',
//     isOnline: false,
//     type: 'Мероприятие',
//   };

//   const getRegistrationStatusText = () => {
//     if (!userId) return 'Записаться';
//     return isRegistered ? 'Отменить запись' : 'Записаться';
//   };

//   return (
//     <div className='event-item-container'>
//       <Link to='/events' className='back-link'>
//         ← Назад к списку событий
//       </Link>

//       <div className='event-layout'>
//         <article className='event-item'>
//           <Title>{displayData.name}</Title>

//           <Tag color={'cyan'}>{displayData.type}</Tag>

//           <div className='event-item-datetime'>
//             <div className='datetime-item'>
//               <CalendarOutlined />
//               <Text type='secondary'>
//                 Дата: <DateFormatter dateString={formatDate(displayData.date)} />
//               </Text>
//             </div>
//             <div className='datetime-item'>
//               <FieldTimeOutlined />
//               <Text type='secondary'>Время: {formatTime(displayData.date)}</Text>
//             </div>
//             {displayData.address && (
//               <div className='datetime-item'>
//                 <EnvironmentOutlined />
//                 <Text type='secondary'>Адрес: {displayData.address}</Text>
//               </div>
//             )}
//           </div>

//           {userId && (
//             <div style={{ margin: '15px 0' }}>
//               <Tag color={isRegistered ? 'green' : 'blue'}>
//                 {isRegistered ? 'Вы записаны на это событие' : 'Вы не записаны на это событие'}
//               </Tag>
//             </div>
//           )}

//           <div className='event-item-content'>
//             <MdxRenderer content={displayData.description} />
//           </div>

//           {/* Добавлен компонент списка участников */}
//           {isAdmin && id && <EventParticipants eventId={id} />}
//         </article>

//         <div className='event-sidebar'>
//           {displayData.imageUrl && (
//             <div className='event-image-container'>
//               <img src={displayData.imageUrl} alt={displayData.name} className='event-item-image' />
//             </div>
//           )}

//           <Button
//             onClick={handleRegistrationClick}
//             loading={registrationLoading || eventLoading}
//             disabled={eventLoading}
//             type={isRegistered ? 'link' : 'primary'}
//             style={{ width: '100%' }}
//           >
//             {getRegistrationStatusText()}
//           </Button>

//           {!userId && (
//             <Text
//               type='secondary'
//               style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}
//             >
//               Авторизуйтесь, чтобы записаться
//             </Text>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useSelector } from 'react-redux';
import { hasAnyRole, selectCurrentUser } from '../../store/slices/authSlice';
import { useMemo, type JSX, useState, useEffect, useCallback } from 'react';
import './event-item-page.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Tag, Typography, message, Button, List, Avatar, Spin } from 'antd';
import {
  CalendarOutlined,
  FieldTimeOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useEventItem } from '../../hooks/Events/useEventsItem';
import { useEventRegistration } from '../../hooks/Events/useEventRegistration';
import { useEventRegistrations } from '../../hooks/Events/useEventRegistrations';
import { formatDate } from '../../utils/dateFormatter';
import { formatTime } from '../../utils/timeFormatter';
import { MdxRenderer } from '../../components/MdxRenderer/MdxRenderer';

const { Title, Text } = Typography;

type DateFormatterProps = {
  dateString: string;
};

function DateFormatter({ dateString }: DateFormatterProps) {
  const formattedDate = useMemo(() => {
    const date = new Date(dateString.split('.').reverse().join('-'));

    const formatted = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }).format(date);

    const parts = formatted.split(', ');
    if (parts.length === 2) {
      return `${parts[1]}, ${parts[0]}`;
    }

    return formatted;
  }, [dateString]);

  return formattedDate;
}

type RegisteredUser = {
  id: string;
  name: string;
  email: string;
};

// Компонент списка участников
function EventParticipants({
  eventId,
  refreshTrigger,
}: {
  eventId: string;
  refreshTrigger?: boolean; // Добавляем проп для принудительного обновления
}) {
  const [registrationsWithUsers, setRegistrationsWithUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getEventRegistrationsWithUsers } = useEventRegistrations();

  const fetchParticipants = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getEventRegistrationsWithUsers(eventId, 100);
      setRegistrationsWithUsers(response.items);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Не удалось загрузить список участников';
      setError(errorMessage);
      console.error('Ошибка загрузки участников:', err);
    } finally {
      setLoading(false);
    }
  }, [eventId, getEventRegistrationsWithUsers]);

  // Эффект для загрузки участников при изменении eventId или refreshTrigger
  useEffect(() => {
    fetchParticipants();
  }, [eventId, refreshTrigger, fetchParticipants]);

  // Опционально: добавьте кнопку ручного обновления
  const handleManualRefresh = () => {
    fetchParticipants();
    message.info('Список участников обновлен');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Spin tip='Загрузка участников...' />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '10px' }}>
        <div style={{ color: 'red', marginBottom: '10px' }}>Ошибка: {error}</div>
        <Button onClick={handleManualRefresh} size='small'>
          Повторить попытку
        </Button>
      </div>
    );
  }

  // Фильтруем только регистрации с данными пользователей
  const registrationsWithValidUsers = registrationsWithUsers.filter(item => item.user);

  if (registrationsWithValidUsers.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Text type='secondary'>На это событие еще никто не записался</Text>
        <div style={{ marginTop: '10px' }}>
          <Button onClick={handleManualRefresh} size='small'>
            Обновить
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='event-participants'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Участники ({registrationsWithValidUsers.length})
        </Title>
      </div>

      <List
        dataSource={registrationsWithValidUsers}
        renderItem={registration => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<Text strong>{registration.user.userName}</Text>}
              description={
                <div>
                  <div>{registration.user.email}</div>
                  <div style={{ marginTop: 4, fontSize: '12px', color: '#888' }}>
                    Записался: {new Date(registration.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
        style={{ backgroundColor: '#fafafa', borderRadius: 8, padding: '0 16px' }}
      />
    </div>
  );
}

export default function EventItem(): JSX.Element {
  const userCheck = useSelector(selectCurrentUser);
  const isAdmin = hasAnyRole(userCheck, ['admin', 'superadmin']);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [participantsRefreshTrigger, setParticipantsRefreshTrigger] = useState(false);

  const { eventsItem, loading: eventLoading } = useEventItem(id);
  const {
    isRegistered,
    loading: registrationLoading,
    error: registrationError,
    toggleRegistration,
    userId,
    user,
  } = useEventRegistration(id);

  if (registrationError) {
    message.error(registrationError);
  }

  const handleRegistrationClick = async () => {
    if (!userId || !user) {
      message.info('Для записи на событие необходимо авторизоваться');
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }

    try {
      await toggleRegistration();

      // Обновляем состояние для принудительного обновления списка участников
      setParticipantsRefreshTrigger(prev => !prev);

      message.success(
        isRegistered ? 'Вы успешно отменили запись на событие' : 'Вы успешно записались на событие'
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        (isRegistered ? 'Не удалось отменить запись' : 'Не удалось записаться на событие');
      message.error(errorMessage);
    }
  };

  const displayData = eventsItem || {
    name: 'Загрузка...',
    description: 'Загрузка описания...',
    date: new Date().toISOString(),
    address: 'Адрес не указан',
    imageUrl: '',
    isOnline: false,
    type: 'Мероприятие',
  };

  const getRegistrationStatusText = () => {
    if (!userId) return 'Записаться';
    return isRegistered ? 'Отменить запись' : 'Записаться';
  };

  return (
    <div className='event-item-container'>
      <Link to='/events' className='back-link'>
        ← Назад к списку событий
      </Link>

      <div className='event-layout'>
        <article className='event-item'>
          <Title>{displayData.name}</Title>

          <Tag color={'cyan'}>{displayData.type}</Tag>

          <div className='event-item-datetime'>
            <div className='datetime-item'>
              <CalendarOutlined />
              <Text type='secondary'>
                Дата: <DateFormatter dateString={formatDate(displayData.date)} />
              </Text>
            </div>
            <div className='datetime-item'>
              <FieldTimeOutlined />
              <Text type='secondary'>Время: {formatTime(displayData.date)}</Text>
            </div>
            {displayData.address && (
              <div className='datetime-item'>
                <EnvironmentOutlined />
                <Text type='secondary'>Адрес: {displayData.address}</Text>
              </div>
            )}
          </div>

          {userId && (
            <div style={{ margin: '15px 0' }}>
              <Tag color={isRegistered ? 'green' : 'blue'}>
                {isRegistered ? 'Вы записаны на это событие' : 'Вы не записаны на это событие'}
              </Tag>
            </div>
          )}

          <div className='event-item-content'>
            <MdxRenderer content={displayData.description} />
          </div>

          {/* Передаем refreshTrigger для обновления списка участников */}
          {isAdmin && id && (
            <EventParticipants eventId={id} refreshTrigger={participantsRefreshTrigger} />
          )}
        </article>

        <div className='event-sidebar'>
          {displayData.imageUrl && (
            <div className='event-image-container'>
              <img src={displayData.imageUrl} alt={displayData.name} className='event-item-image' />
            </div>
          )}

          <Button
            onClick={handleRegistrationClick}
            loading={registrationLoading || eventLoading}
            disabled={eventLoading}
            type={isRegistered ? 'link' : 'primary'}
            style={{ width: '100%' }}
          >
            {getRegistrationStatusText()}
          </Button>

          {!userId && (
            <Text
              type='secondary'
              style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}
            >
              Авторизуйтесь, чтобы записаться
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
