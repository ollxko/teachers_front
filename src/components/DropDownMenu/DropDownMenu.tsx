import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Menu, Space, Avatar } from 'antd';
import { DownOutlined, UserOutlined, StarOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ProfilePopup from '../PopUpProfile/PopUpProfile';
import { logout, selectCurrentUser } from '../../store/slices/authSlice';
import { type AppDispatch } from '../../store/store';

const UserMenuDropdown: React.FC = () => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [userInitial, setUserInitial] = useState<string>('П');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user?.username) {
      const initial = user.username.charAt(0).toUpperCase();
      setUserInitial(initial);
    } else if (user?.email) {
      const initial = user.email.charAt(0).toUpperCase();
      setUserInitial(initial);
    } else {
      setUserInitial('П');
    }
  }, [user]);

  const handleMenuClick: MenuProps['onClick'] = e => {
    console.log('Selected:', e.key);

    if (e.key === 'profile') {
      setIsProfilePopupOpen(true);
    }

    if (e.key === 'logout') {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const handleEditData = () => {
    console.log('Редактировать данные');
    navigate('/profile/edit');
    setIsProfilePopupOpen(false);
  };

  const handleChangePassword = () => {
    console.log('Поменять пароль');
    navigate('/profile/password');
    setIsProfilePopupOpen(false);
  };

  if (!user) {
    return (
      <Button type='primary' onClick={() => navigate('/login')}>
        Войти
      </Button>
    );
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.ItemGroup title='Профиль'>
        <Menu.Item key='profile' icon={<UserOutlined />}>
          Профиль
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.Divider />

      <Menu.Item key='my-courses' icon={<StarOutlined />}>
        <Link
          to='/my-courses-events'
          style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
          onClick={e => e.stopPropagation()} // Предотвращаем всплытие
        >
          Мои события
        </Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key='logout' icon={<LogoutOutlined />} style={{ color: '#ff4d4f' }}>
        Выход
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
        <Button
          type='text'
          style={{
            color: 'white',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Space>
            <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.username || user.email?.split('@')[0] || 'Пользователь'}
            </span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <ProfilePopup
        open={isProfilePopupOpen}
        onClose={() => setIsProfilePopupOpen(false)}
        onEditData={handleEditData}
        onChangePassword={handleChangePassword}
        userName={user.username || user.email?.split('@')[0] || 'Пользователь'}
        userEmail={user.email || ''}
      />
    </>
  );
};

export default UserMenuDropdown;
