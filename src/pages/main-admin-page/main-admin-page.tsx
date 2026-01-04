import { useState } from 'react';
import { Radio, Input, TimePicker, Card, Button, message, Space, Form } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import CalendarSelect from '../../components/CalendarSelect/CalendarSelect';
import { MdxEditorComponent } from '../../components/MdxEditor/MdxEditor';
import './main-admin-page.css';

export function MainPage() {
  const [markdown, setMarkdown] = useState('# Hello world');
  const [status, setStatus] = useState('online');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [address, setAddress] = useState('');
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  const [editorMode, setEditorMode] = useState('edit');
  const [isSaving, setIsSaving] = useState(false);

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    setSelectedTime(time);
    if (time) {
      console.log('Выбрано время:', time.format('HH:mm'));
    }
  };

  const handleMarkdownChange = (newMarkdown: string) => {
    setMarkdown(newMarkdown);
  };

  const handleSave = async () => {
    if (!markdown.trim()) {
      message.warning('Редактор пуст. Добавьте контент перед сохранением.');
      return;
    }

    const saveData = {
      markdownContent: markdown,
      metadata: {
        status: status === 'online' ? 'Опубликован' : 'Черновик',
        publishDate: selectedDate || 'Не указана',
        address: address || 'Не указан',
        publishTime: selectedTime ? selectedTime.format('HH:mm') : 'Не указано',
        editorMode: editorMode === 'edit' ? 'Редактирование' : 'Предпросмотр',
      },
    };

    console.log('Данные для сохранения:', saveData);
    setIsSaving(true);
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
              loading={isSaving}
              disabled={!markdown.trim()}
              size='small'
            >
              Отправить на сервер
            </Button>
          </Space>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

          <div style={{ width: 300 }}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Дата:</div>
            <CalendarSelect
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder='Выберите дату'
              width='100%'
            />
          </div>

          <div style={{ width: 400 }}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Адрес:</div>
            <Input
              placeholder='Введите адрес'
              value={address}
              onChange={e => setAddress(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ width: 200 }}>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Время:</div>
            <TimePicker
              value={selectedTime}
              onChange={handleTimeChange}
              format='HH:mm'
              style={{ width: '100%' }}
              placeholder='Выберите время'
            />
          </div>

          <div>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>Режим работы:</div>
            <Radio.Group
              value={editorMode}
              onChange={e => setEditorMode(e.target.value)}
              optionType='button'
              buttonStyle='solid'
              style={{ width: '100%' }}
            >
              <Radio value='edit' style={{ flex: 1, textAlign: 'center' }}>
                Редактирование
              </Radio>
              <Radio value='preview' style={{ flex: 1, textAlign: 'center' }}>
                Предпросмотр
              </Radio>
            </Radio.Group>
          </div>
        </div>
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
