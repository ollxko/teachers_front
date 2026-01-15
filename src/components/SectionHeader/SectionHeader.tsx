// components/SectionHeader/SectionHeader.tsx
import React, { type JSX } from 'react';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import './SectionHeader.css';

export type SectionHeaderProps = {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function SectionHeader({
  title,
  buttonText = 'Перейти ко всем',
  onButtonClick,
}: SectionHeaderProps): JSX.Element {
  return (
    <div className='section-header'>
      <h2 className='section-title'>{title}</h2>
      <Button type='link' onClick={onButtonClick} className='section-button'>
        {buttonText}
        <RightOutlined />
      </Button>
    </div>
  );
}
