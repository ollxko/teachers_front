import { useState, useCallback, type JSX, useEffect } from 'react';
import { Input, Card, Button, message, Space, Row, Col, Spin, Typography } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MdxEditorComponent } from '../../../components/MdxEditor/MdxEditor';
import './create-course-page.css';

import { ImageUpload } from '../../../components/ImageUploader/ImageUploader';

export default function CreateCoursePage(): JSX.Element {
  const [markdown, setMarkdown] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseLink, setCourseLink] = useState(''); // Новое состояние для ссылки на курс

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const handleMarkdownChange = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
  }, []);
  //   const navigate = useNavigate();
  //   const [messageApi, contextHolder] = message.useMessage();

  //   const { addCourse, result, loading, error } = useAddEvent();

  //   useEffect(() => {
  //     if (result) {
  //       messageApi.success('Курс успешно создан', 5);
  //       navigate('/courses');
  //     }
  //   }, [result, navigate]);

  //   useEffect(() => {
  //     if (error) {
  //       messageApi.error(`Ошибка при создании курса: ${error}`, 5);
  //     }
  //   }, [error]);

  //   const handleSave = async () => {
  //     const newCourse: AddCourseRequest = {
  //       name: courseName,
  //       description: markdown,
  //       imageBase64: uploadedImage || '',
  //       link: courseLink, // Добавляем ссылку в запрос
  //     };

  //     await addCourse(newEvent);
  //   };

  const isFormValid = markdown.trim() && courseName.trim() && courseLink.trim(); // Добавляем проверку ссылки

  return (
    <div className='editor-container'>
      {/* {contextHolder} */}
      <Card
        title='Создание курса'
        size='small'
        className='course-card'
        extra={
          <Space>
            <Button
              type='primary'
              icon={<CloudUploadOutlined />}
              //   onClick={handleSave}
              //   loading={loading}
              //   disabled={!isFormValid || loading}
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
                <div className='form-label'>Название курса:</div>
                <Input
                  placeholder='Введите название курса'
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                  className='full-width-input'
                />
              </div>

              {/* Новое поле для ссылки на курс */}
              <div className='form-field' style={{ marginTop: '16px' }}>
                <div className='form-label'>Ссылка на курс:</div>
                <Input
                  placeholder='https://example.com/course'
                  value={courseLink}
                  onChange={e => setCourseLink(e.target.value)}
                  className='full-width-input'
                  type='url'
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
