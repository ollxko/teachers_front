import type { JSX } from 'react';
import { useState } from 'react';
import { Input, Button } from 'antd';
import './creating-account-page.css';
import { Title, Text } from '../../../utils/typography';

export default function CreateAccountPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setValidationMessage(true);
    } else {
      setValidationMessage(false);
    }
    console.log('Регистрация:', { username, password });
  };

  return (
    <div className='create-account-page-container'>
      <div className='inputs-container'>
        <Title level={3}>Создание аккаунта</Title>
        <Text>Придумайте имя пользователя</Text>
        <Input
          placeholder='Имя пользователя'
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginBottom: '12px' }}
        />
        <Text>Придумайте пароль</Text>

        <Input.Password
          placeholder='Пароль'
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: '12px' }}
        />
        <Text>Подтвердите пароль</Text>
        <Input.Password
          placeholder='Подтвердите пароль'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        {validationMessage && <Text className='validationMessage'>Пароли не совпадают</Text>}

        <Button
          type='primary'
          block
          onClick={handleRegister}
          disabled={!username || !password || !confirmPassword}
          style={{ marginTop: '24px' }}
        >
          Создать аккаунт
        </Button>
      </div>
    </div>
  );
}
