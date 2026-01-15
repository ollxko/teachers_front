import type { JSX } from 'react';
import { useState } from 'react';
import { Input, Button } from 'antd';
import './creating-account-page.css';
import { Title, Text } from '../../../utils/typography';

export default function EmailValidationPage(): JSX.Element {
  const [email, setEmail] = useState('');

  const handleValidateEmail = () => {
    throw new Error('Function not implemented.');
  };

  return (
    <div className='input-container'>
      <Title level={3}>Регистрация</Title>
      <Input
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginBottom: '12px' }}
      />
      <Button
        type='primary'
        block
        onClick={handleValidateEmail}
        disabled={!email}
        style={{ marginTop: '24px' }}
      >
        Создать аккаунт
      </Button>
    </div>
  );
}
