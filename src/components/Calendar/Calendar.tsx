import React, { useState, type JSX } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css'; // Импорт кастомных стилей

registerLocale('ru', ru);

export default function Calendar(): JSX.Element {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      locale='ru'
      dateFormat='dd.MM.yyyy'
      placeholderText='дд.мм.гггг'
      isClearable
      className='custom-datepicker-input'
      wrapperClassName='custom-datepicker-wrapper'
      popperClassName='custom-datepicker-popper'
    />
  );
}
