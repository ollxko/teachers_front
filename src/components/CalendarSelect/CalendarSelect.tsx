import React, { useState, useRef, useEffect } from 'react';
import { Select, Calendar, Divider } from 'antd';
import type { Dayjs } from 'dayjs';
import './CalendarSelect.css';

const { Option } = Select;

interface CalendarSelectProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  width?: number | string;
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

export default function CalendarSelect({
  value,
  onChange,
  placeholder = 'Выберите дату',
  width = 300,
  size = 'middle',
  className = '',
}: CalendarSelectProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState<number>(Number(width) || 300);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      const selectWidth = selectRef.current.offsetWidth;
      setDropdownWidth(selectWidth);
    }
  }, [width, isCalendarOpen]);

  const handleDateSelect = (date: Dayjs) => {
    const formattedDate = date.format('DD.MM.YYYY');
    onChange?.(formattedDate);
    setIsCalendarOpen(false);
  };

  const calendarContent = (
    <div className='calendar-select-content' style={{ width: dropdownWidth }}>
      <div className='calendar-wrapper'>
        <Calendar fullscreen={false} onSelect={handleDateSelect} />
      </div>
      <Divider className='calendar-divider' />
      <div className='calendar-footer'>
        <a onClick={() => setIsCalendarOpen(false)} className='close-calendar-link'>
          Закрыть
        </a>
      </div>
    </div>
  );

  return (
    <div ref={selectRef}>
      <Select
        placeholder={placeholder}
        value={value || undefined}
        open={isCalendarOpen}
        onOpenChange={open => setIsCalendarOpen(open)}
        popupRender={() => calendarContent}
        size={size}
        style={{ width }}
        className={`calendar-select ${className}`}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ padding: 0 }}
      >
        <Option key='calendar' value='calendar' style={{ display: 'none' }}>
          {value}
        </Option>
      </Select>
    </div>
  );
}
