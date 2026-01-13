import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Button, Typography } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import './login-page.css';

export default function LoginPage(): JSX.Element {
  const { Title } = Typography;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error } = useAuth();

  const from = '/news';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async () => {
    await login({ login: username, password });
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

        {error && (
          <div
            style={{
              color: 'red',
              marginBottom: '16px',
              padding: '8px',
              backgroundColor: '#fff2f0',
              border: '1px solid #ffccc7',
              borderRadius: '4px',
            }}
          >
            {error}
          </div>
        )}

        <Input
          placeholder='Введите логин'
          size='large'
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ marginBottom: '16px' }}
          disabled={isLoading}
        />
        <Input.Password
          placeholder='Введите пароль'
          size='large'
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ marginBottom: '24px' }}
          disabled={isLoading}
        />
        <Button
          type='primary'
          size='large'
          block
          loading={isLoading}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
      </div>
    </div>
  );
}
