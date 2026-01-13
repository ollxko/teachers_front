import { useState, useRef } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Spin, Typography, message } from 'antd';

interface ImageUploadProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  allowedTypes?: string[];
  maxSize?: number;
}

export function ImageUpload({
  uploadedImage,
  setUploadedImage,
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  maxSize = 5 * 1024 * 1024,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (!allowedTypes.includes(file.type)) {
      messageApi.error('Пожалуйста, выберите файл изображения (JPEG, JPG, PNG)', 5);
      return;
    }

    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
      messageApi.error(
        `Файл слишком большой! Размер файла: ${fileSizeMB}MB. Максимальный размер: ${maxSizeMB}MB`,
        5
      );
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = e => {
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

  return (
    <>
      {contextHolder}
      <div className={`image-upload-container ${uploadedImage ? 'has-image' : ''}`}>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept='image/*'
          className='file-input'
        />

        {isUploading ? (
          <Spin tip='Загрузка изображения...' size='large'>
            <div className='spin-container' />
          </Spin>
        ) : uploadedImage ? (
          <div className='image-preview-container'>
            <div className='image-preview-wrapper'>
              <img src={uploadedImage} alt='Uploaded preview' className='image-preview' />
            </div>

            <Space>
              <Button
                type='primary'
                icon={<UploadOutlined />}
                onClick={triggerFileInput}
                size='small'
              >
                Заменить
              </Button>
              <Button danger icon={<DeleteOutlined />} onClick={handleRemoveImage} size='small'>
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
              <Button type='primary' icon={<UploadOutlined />} onClick={triggerFileInput}>
                Выбрать файл
              </Button>
            </div>

            <Typography.Text type='secondary' className='upload-hint'>
              Поддерживаемые форматы: JPEG, JPG, PNG
              <br />
              Максимальный размер: 5MB
            </Typography.Text>
          </div>
        )}
      </div>
    </>
  );
}
