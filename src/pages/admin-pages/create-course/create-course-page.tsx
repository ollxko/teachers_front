import { useState, useCallback, type JSX, useEffect } from 'react';
import { Input, InputNumber, Card, Button, message, Space, Row, Col, Spin, Typography } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MdxEditorComponent } from '../../../components/MdxEditor/MdxEditor';
import './create-course-page.css';
import { ImageUpload } from '../../../components/ImageUploader/ImageUploader';
import type { SetMessageProps } from '../../../utils/setMessage';
import { useAddCourse } from '../../../hooks/Courses/useAddCourse';
import type { AddCourseRequest } from '../../../api/coursesApi';

export default function CreateCoursePage({ setMessage }: SetMessageProps): JSX.Element {
  const [markdown, setMarkdown] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseLink, setCourseLink] = useState('');
  const [price, setPrice] = useState(0);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const [messageInstance, messageElement] = message.useMessage();

  const { addCourse, result, loading, error } = useAddCourse();

  useEffect(() => {
    if (result) {
      setMessage('Курс успешно создан');
      navigate('/courses');
    }
  }, [result, navigate]);

  useEffect(() => {
    if (error) {
      messageInstance.error(`Ошибка при создании курса: ${error}`, 5);
    }
  }, [error]);

  const handleMarkdownChange = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
  }, []);

    const handleSave = async () => {
      const newCourse: AddCourseRequest = {
        name: courseName,
        description: markdown,
        link: courseLink,
        price: price,
      };

      if (uploadedImage) {
        newCourse.imageBase64 = uploadedImage;
      }

      await addCourse(newCourse);
    };

  const isFormValid = markdown.trim() && courseName.trim() && courseLink.trim();

  return (
    <div className='editor-container'>
      {messageElement}
      <Card
        title='Создание курса'
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
                <div className='form-label'>Название курса:</div>
                <Input
                  placeholder='Введите название курса'
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                  className='full-width-input'
                />
              </div>

              <div className='form-field'>
                <div className='form-label'>Ссылка на курс:</div>
                <Input
                  placeholder='https://example.com/course'
                  value={courseLink}
                  onChange={e => setCourseLink(e.target.value)}
                  className='full-width-input'
                  type='url'
                />
              </div>

              <div className='form-field'>
                <div className='form-label'>Стоимость:</div>
                <InputNumber
                  min={0}
                  defaultValue={price}
                  onChange={value => setPrice(value || 0)}
                  className='full-width-input'
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
