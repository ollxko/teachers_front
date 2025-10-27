import type { JSX } from 'react';
import './InfoTable.css';

type InfoTableItem = {
  title: string;
  data: string | number | React.ReactNode;
};

type InfoTableProps = {
  items: InfoTableItem[];
  className?: string;
};

export default function InfoTable({ items, className = '' }: InfoTableProps): JSX.Element {
  return (
    <div className={`data-list ${className}`}>
      {items.map((item, index) => (
        <div key={index} className='data-list__item'>
          <div className='data-list__content'>
            <div className='data-list__title'>{item.title}</div>
            <div className='data-list__data'>{item.data}</div>
          </div>
          {index < items.length - 1 && <div className='data-list__divider' />}
        </div>
      ))}
    </div>
  );
}
