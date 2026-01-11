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

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
  const [messageApi, contextHolder] = message.useMessage();

  const { addEvent, result, loading, error } = useAddEvent();

  useEffect(() => {
    if (result) {
      messageApi.success('Событие успешно создано', 5);
      navigate('/events');
    }
  }, [result, navigate]);

  useEffect(() => {
    if (error) {
      messageApi.error(`Ошибка при создании события: ${error}`, 5);
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

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      console.log(file.type);
      messageApi.error('Пожалуйста, выберите файл изображения (JPEG, JPG, PNG)', 5);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
      messageApi.error(
        `Файл слишком большой! Размер файла: ${fileSizeMB}MB. Максимальный размер: ${maxSizeMB}MB`,
        5
      );
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setUploadedImage(base64);
      setIsUploading(false);
    };

    reader.onerror = () => {
      messageApi.error('Ошибка при чтении файла', 5);
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    const dateObj = dayjs(selectedDate);
    const dateString = dateObj.format('YYYY-MM-DD');
    const timeString = selectedTime?.format('HH:mm') || '00:00';
    
    const dateTimeString = `${dateString}T${timeString}:00.000Z`;

    const newEvent: AddEventRequest = {
      name: eventName,
      description: markdown,
      type: status === 'online' ? 1 : 0,
      date: dateTimeString,
      address: address,
      imageBase64: uploadedImage || '',
    };

    await addEvent(newEvent);
  };

  const isFormValid = markdown.trim() && eventName.trim() && selectedDate && selectedTime;

  return (
    <div className='editor-container'>
      {contextHolder}
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
                  placeholder={status === 'online' ? 'Для онлайн событий не требуется' : 'Введите адрес'}
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
            <div className={`image-upload-container ${uploadedImage ? 'has-image' : ''}`}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className='file-input'
              />
              
              {isUploading ? (
                <Spin tip="Загрузка изображения..." size="large">
                  <div className='spin-container' />
                </Spin>
              ) : uploadedImage ? (
                <div className='image-preview-container'>
                  <div className='image-preview-wrapper'>
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className='image-preview'
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
                <div>
                  <div className='upload-icon-wrapper'>
                    <UploadOutlined className='upload-icon-large' />
                  </div>
                  
                  <div className='upload-button-wrapper'>
                    <Button
                      type="primary"
                      icon={<UploadOutlined />}
                      onClick={triggerFileInput}
                    >
                      Выбрать файл
                    </Button>
                  </div>
                  
                  <Typography.Text type="secondary" className='upload-hint'>
                    Поддерживаемые форматы: JPEG, JPG, PNG
                    <br />
                    Максимальный размер: 5MB
                  </Typography.Text>
                </div>
              )}
            </div>
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
