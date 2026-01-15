import { useState, useCallback, type JSX, useEffect } from 'react';
import {
  Radio,
  Input,
  TimePicker,
  Card,
  Button,
  message,
  Space,
  Row,
  Col,
  Spin,
  Typography,
} from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import CalendarSelect from '../../../components/CalendarSelect/CalendarSelect';
import { MdxEditorComponent } from '../../../components/MdxEditor/MdxEditor';
import './create-event-page.css';
import type { AddEventRequest } from '../../../api/eventsApi';
import { useAddEvent } from '../../../hooks/Events/useAddEvent';
import { ImageUpload } from '../../../components/ImageUploader/ImageUploader';
import type { SetMessageProps } from '../../../utils/setMessage';

export default function CreateEventPage({ setMessage }: SetMessageProps): JSX.Element {
  const [markdown, setMarkdown] = useState('');
  const [status, setStatus] = useState('online');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [address, setAddress] = useState('');
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  const [eventName, setEventName] = useState('');

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [messageInstance, messageElement] = message.useMessage();

  const { addEvent, result, loading, error } = useAddEvent();

  useEffect(() => {
    if (result) {
      setMessage('Событие успешно создано');
      navigate('/events');
    }
  }, [result, navigate]);

  useEffect(() => {
    if (error) {
      messageInstance.error(`Ошибка при создании события: ${error}`, 5);
    }
  }, [error]);

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    setSelectedTime(time);
  };

  const handleMarkdownChange = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
  }, []);

  const handleSave = async () => {
    const dateObj = dayjs(selectedDate, 'DD.MM.YYYY');
    const dateString = dateObj.format('YYYY-MM-DD');
    const timeString = selectedTime?.format('HH:mm') || '00:00';

    const dateTimeString = `${dateString}T${timeString}:00.000Z`;

    const newEvent: AddEventRequest = {
      name: eventName,
      description: markdown,
      type: status === 'online' ? 1 : 0,
      date: dateTimeString,
      address: address,
    };

    if (uploadedImage) {
      newEvent.imageBase64 = uploadedImage;
    }

    await addEvent(newEvent);
  };

  const isFormValid = markdown.trim() && eventName.trim() && selectedDate && selectedTime;

  return (
    <div className='editor-container'>
      {messageElement}
      <Card
        title='Создание события'
        size='small'
        className='event-card'
        extra={
          <Space>
            <Button
              type='primary'
              icon={<CloudUploadOutlined />}
              onClick={handleSave}
              loading={loading}
              disabled={!isFormValid || loading}
              size='small'
            >
              Сохранить
            </Button>
          </Space>
        }
      >
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <div className='form-container'>
              <div className='form-field'>
                <div className='form-label'>Название события:</div>
                <Input
                  placeholder='Введите название события'
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  className='full-width-input'
                />
              </div>

              <div className='form-field'>
                <div className='form-label'>Формат:</div>
                <Radio.Group
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  buttonStyle='solid'
                  className='radio-group'
                >
                  <Radio.Button value='online' className='radio-button'>
                    Онлайн
                  </Radio.Button>
                  <Radio.Button value='offline' className='radio-button'>
                    Оффлайн
                  </Radio.Button>
                </Radio.Group>
              </div>

              <div className='form-field'>
                <div className='form-label'>Дата:</div>
                <CalendarSelect
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder='Выберите дату'
                  width='100%'
                />
              </div>

              <div className='form-field'>
                <div className='form-label'>Адрес:</div>
                <Input
                  placeholder={
                    status === 'online' ? 'Для онлайн событий не требуется' : 'Введите адрес'
                  }
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className='full-width-input'
                  disabled={status === 'online'}
                />
              </div>

              <div className='form-field'>
                <div className='form-label'>Время:</div>
                <TimePicker
                  value={selectedTime}
                  onChange={handleTimeChange}
                  format='HH:mm'
                  style={{ width: '100%' }}
                  placeholder='Выберите время'
                />
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
          </Col>
        </Row>
      </Card>

      <div className='mdx-editor-wrapper'>
        <MdxEditorComponent
          initialMarkdown={markdown}
          onMarkdownChange={handleMarkdownChange}
          className='full-height-editor'
        />
      </div>
    </div>
  );
}
