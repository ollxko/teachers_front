import type { JSX } from 'react';
import './Button.css';

type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps): JSX.Element {
  return (
    <div className='enroll'>
      <button className='enroll-button'>{text}</button>
    </div>
  );
}
