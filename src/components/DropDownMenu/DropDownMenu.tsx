import React, { useState } from 'react';
import { Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined, UserOutlined, StarOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import ProfilePopup from '../PopUpProfile/PopUpProfile';

const UserMenuDropdown: React.FC = () => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = e => {
    console.log('Selected:', e.key);

    if (e.key === 'profile') {
      setIsProfilePopupOpen(true);
    }

    if (e.key === 'logout') {
      console.log('Выход из системы');
    }
  };

  const handleEditData = () => {
    console.log('Редактировать данные');
    navigate('/profile/edit');
  };

  const handleChangePassword = () => {
    console.log('Поменять пароль');
    navigate('/profile/password');
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='profile' icon={<UserOutlined />}>
        Профиль
      </Menu.Item>
      <Menu.Item key='my-courses' icon={<StarOutlined />}>
        <Link
          to='/my-courses-events'
          style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
        >
          Мои курсы и события
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
      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          type='text'
          style={{
            color: 'white',
            fontWeight: 500,
          }}
        >
          <Space>
            Имя
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <ProfilePopup
        open={isProfilePopupOpen}
        onClose={() => setIsProfilePopupOpen(false)}
        onEditData={handleEditData}
        onChangePassword={handleChangePassword}
        userName='Иван Иванов'
        userEmail='ivan@example.com'
      />
    </>
  );
};

export default UserMenuDropdown;
