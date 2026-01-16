import React from 'react';
import { Modal, Typography, Button } from 'antd';
import { EditOutlined, LockOutlined } from '@ant-design/icons';
import './PopUpProfile.css';

const { Title, Text } = Typography;

export type ProfilePopupProps = {
  open: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
  onEditData?: () => void;
  onChangePassword?: () => void;
};

const ProfilePopup: React.FC<ProfilePopupProps> = ({
  open,
  onClose,
  userName = 'Иван Иванов',
  userEmail = 'ivan@example.com',
  onEditData,
  onChangePassword,
}) => {
  const handleEditData = () => {
    onEditData?.();
    onClose();
  };

  const handleChangePassword = () => {
    onChangePassword?.();
    onClose();
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={300}
      centered
      className='profile-popup-modal'
    >
      <div className='profile-popup-content'>
        <Title level={4} className='profile-popup-title'>
          Профиль
        </Title>

        <div className='profile-popup-info'>
          <div className='profile-popup-info-item'>
            <Text type='secondary' className='profile-popup-info-label'>
              Имя
            </Text>
            <Text className='profile-popup-info-value'>{userName}</Text>
          </div>

          <div className='profile-popup-info-item'>
            <Text type='secondary' className='profile-popup-info-label'>
              Email
            </Text>
            <Text className='profile-popup-info-value'>{userEmail}</Text>
          </div>
        </div>

        <div className='profile-popup-actions'>
          {/* <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={handleEditData}
            className='profile-popup-action-button'
            block
          >
            Редактировать данные
          </Button>

          <Button
            icon={<LockOutlined />}
            onClick={handleChangePassword}
            className='profile-popup-action-button'
            block
          >
            Поменять пароль
          </Button> */}
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePopup;
