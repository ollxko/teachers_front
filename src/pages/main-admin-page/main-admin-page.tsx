import { useState, useCallback, useRef, type JSX, useEffect } from 'react';
import { Radio, Input, TimePicker, Card, Button, message, Space, Row, Col, Spin, Typography } from 'antd';
import { CloudUploadOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import CalendarSelect from '../../components/CalendarSelect/CalendarSelect';
import { MdxEditorComponent } from '../../components/MdxEditor/MdxEditor';
import './main-admin-page.css';
import type { AddEventRequest } from '../../api/eventApi';
import { useAddEvent } from '../../hooks/Events/useAddEvent';

export function MainPage(): JSX.Element {
  const [markdown, setMarkdown] = useState('# Hello world');
  const [status, setStatus] = useState('online');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [address, setAddress] = useState('');
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  const [eventName, setEventName] = useState('');

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // Используем хук правильно
  const { addEvent, result, loading, error } = useAddEvent();

  // Обработка результата
  useEffect(() => {
    if (result) {
      message.success('Событие успешно создано!');
      navigate('/events');
    }
  }, [result, navigate]);

  useEffect(() => {
    if (error) {
      message.error(`Ошибка при создании события: ${error}`);
    }
  }, [error]);

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    setSelectedTime(time);
  };

  const handleMarkdownChange = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      message.error('Пожалуйста, выберите файл изображения (JPEG, PNG, GIF, WebP)');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      message.error('Размер файла не должен превышать 5MB');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setUploadedImage(base64);
      setIsUploading(false);
      message.success('Изображение успешно загружено');
    };

    reader.onerror = () => {
      message.error('Ошибка при чтении файла');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    message.info('Изображение удалено');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!markdown.trim()) {
      message.warning('Редактор пуст. Добавьте контент перед сохранением.');
      return;
    }

    if (!eventName.trim()) {
      message.warning('Введите название события');
      return;
    }

    if (!selectedDate) {
      message.warning('Выберите дату события');
      return;
    }

    if (!selectedTime) {
      message.warning('Выберите время события');
      return;
    }

    try {
      // Формируем дату в формате YYYY-MM-DD
      const dateObj = dayjs(selectedDate);
      if (!dateObj.isValid()) {
        message.error('Неверная дата. Пожалуйста, выберите дату заново.');
        return;
      }

      if (!selectedTime.isValid()) {
        message.error('Неверное время. Пожалуйста, выберите время заново.');
        return;
      }

      const dateString = dateObj.format('YYYY-MM-DD');
      const timeString = selectedTime.format('HH:mm');
      
      // Создаем полную строку даты и времени
      const dateTimeString = `${dateString}T${timeString}:00.000Z`;
      
      // Проверяем, что получилась валидная дата
      const finalDate = new Date(dateTimeString);
      if (isNaN(finalDate.getTime())) {
        message.error('Неверная комбинация даты и времени');
        return;
      }

      const newEvent: AddEventRequest = {
        name: eventName,
        description: markdown,
        type: status === 'online' ? 0 : 1,
        date: dateTimeString,
        address: address || 'Баргузин',
        imageBase64: uploadedImage || '',
      };

      console.log('Данные для сохранения:', newEvent);
      console.log('Дата в ISO формате:', dateTimeString);

      // Вызываем функцию addEvent
      const success = await addEvent(newEvent);
      
      if (success) {
        console.log('Событие успешно создано');
      }

    } catch (error) {
      console.error('Ошибка при формировании даты:', error);
      message.error('Ошибка при формировании даты события');
    }
  };

  return (
    <div className='editor-container'>
      <Card
        title='Создание события'
        size='small'
        style={{ marginBottom: 16 }}
        extra={
          <Space>
            <Button
              type='primary'
              icon={<CloudUploadOutlined />}
              onClick={handleSave}
              loading={loading}
              disabled={!markdown.trim() || !eventName.trim() || !selectedDate || !selectedTime || loading}
              size='small'
            >
              Отправить на сервер
            </Button>
          </Space>
        }
      >
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ marginBottom: 8, fontWeight: 500 }}>Название события:</div>
                <Input
                  placeholder='Введите название события'
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ marginBottom: 8, fontWeight: 500 }}>Формат:</div>
                <Radio.Group
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  buttonStyle='solid'
                  style={{ width: '100%' }}
                >
                  <Radio.Button value='online' style={{ flex: 1, textAlign: 'center' }}>
                    Онлайн
                  </Radio.Button>
                  <Radio.Button value='offline' style={{ flex: 1, textAlign: 'center' }}>
                    Оффлайн
                  </Radio.Button>
                </Radio.Group>
              </div>

              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: 8, fontWeight: 500 }}>Дата:</div>
                <CalendarSelect
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder='Выберите дату'
                  width='100%'
                />
              </div>

              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: 8, fontWeight: 500 }}>Адрес:</div>
                <Input
                  placeholder={status === 'online' ? 'Для онлайн событий не требуется' : 'Введите адрес'}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  style={{ width: '100%' }}
                  disabled={status === 'online'}
                />
              </div>

              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: 8, fontWeight: 500 }}>Время:</div>
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
            <div style={{ 
              border: '1px dashed #d9d9d9', 
              borderRadius: '8px', 
              padding: '20px',
              textAlign: 'center',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: uploadedImage ? 'flex-start' : 'center'
            }}>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              {isUploading ? (
                <Spin tip="Загрузка изображения..." size="large">
                  <div style={{ padding: '50px' }} />
                </Spin>
              ) : uploadedImage ? (
                <div style={{ width: '100%' }}>
                  <div style={{ marginBottom: 16 }}>
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px',
                        borderRadius: '8px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  
                  <Space>
                    <Button
                      type="primary"
                      icon={<UploadOutlined />}
                      onClick={triggerFileInput}
                      size="small"
                    >
                      Заменить
                    </Button>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={handleRemoveImage}
                      size="small"
                    >
                      Удалить
                    </Button>
                  </Space>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: 16 }}>
                    <UploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  </div>
                  
                  <div style={{ marginBottom: 8 }}>
                    <Button
                      type="primary"
                      icon={<UploadOutlined />}
                      onClick={triggerFileInput}
                    >
                      Выбрать файл
                    </Button>
                  </div>
                  
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    Поддерживаемые форматы: JPEG, PNG, GIF, WebP
                    <br />
                    Максимальный размер: 5MB
                  </Typography.Text>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      <div
        style={{
          height: 'auto',
          minHeight: '600px',
        }}
      >
        <MdxEditorComponent
          initialMarkdown={markdown}
          onMarkdownChange={handleMarkdownChange}
          className='full-height-editor'
        />
      </div>
    </div>
  );
}
