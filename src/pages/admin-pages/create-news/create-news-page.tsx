import { useState, useCallback, type JSX, useEffect } from 'react';
import { Input, Card, Button, message, Space, Row, Col, Spin, Typography } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MdxEditorComponent } from '../../../components/MdxEditor/MdxEditor';
import './create-news-page.css';
import { ImageUpload } from '../../../components/ImageUploader/ImageUploader';

export default function CreateNewsPage(): JSX.Element {
  const [markdown, setMarkdown] = useState('');
  const [newsName, setNewsName] = useState('');

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const handleMarkdownChange = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
  }, []);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // const { addNews, result, loading, error } = useAddNewsPost();

  // useEffect(() => {
  //   if (result) {
  //     messageApi.success('Новость успешно создан', 5);
  //     navigate('/news');
  //   }
  // }, [result, navigate]);

  // useEffect(() => {
  //   if (error) {
  //     messageApi.error(`Ошибка при создании новости: ${error}`, 5);
  //   }
  // }, [error]);

  // const handleSave = async () => {
  //   const newNewsItem: AddNewsRequest = {
  //     name: newsItemName,
  //     description: markdown,
  //     imageBase64: uploadedImage || '',
  //   };

  //   await addNews(newNewsItem);
  // };

  const isFormValid = markdown.trim() && newsName.trim();

  return (
    <div className='editor-container'>
      {/* {contextHolder} */}
      <Card
        title='Создание новости'
        size='small'
        className='news-card'
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
                <div className='form-label'>Тема новости:</div>
                <Input
                  placeholder='Введите тему новости'
                  value={newsName}
                  onChange={e => setNewsName(e.target.value)}
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
