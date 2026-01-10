import type { JSX } from 'react';
import { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import './login-page.css';

export default function LoginPage(): JSX.Element {
  const { Title, Text } = Typography;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log('Логин:', username, 'Пароль:', password);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='login-page-container'>
      <div className='inputs-container'>
        <Title level={3}>Вход</Title>
        <Input
          placeholder='Введите логин'
          size='large'
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ marginBottom: '16px' }}
        />
        <Input.Password
          placeholder='Введите пароль'
          size='large'
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ marginBottom: '24px' }}
        />
        <Button type='primary' size='large' block loading={loading} onClick={handleLogin}>
          Войти
        </Button>
      </div>
    </div>
  );
}
