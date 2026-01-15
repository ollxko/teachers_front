import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownStyles } from './styles';

interface MdxRendererProps {
  content: string;
}

export const MdxRenderer: React.FC<MdxRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        // Заголовки
        h1: ({ children }) => <h1 style={markdownStyles.h1}>{children}</h1>,
        h2: ({ children }) => <h2 style={markdownStyles.h2}>{children}</h2>,
        h3: ({ children }) => <h3 style={markdownStyles.h3}>{children}</h3>,
        h4: ({ children }) => <h4 style={markdownStyles.h4}>{children}</h4>,
        
        // Текст
        p: ({ children }) => <p style={markdownStyles.p}>{children}</p>,
        strong: ({ children }) => <strong style={markdownStyles.strong}>{children}</strong>,
        em: ({ children }) => <em style={markdownStyles.em}>{children}</em>,
        
        // // Подчеркивание
        u: ({ children }) => <u>{children}</u>,
        
        // Списки
        ul: ({ children }) => <ul style={markdownStyles.ul}>{children}</ul>,
        ol: ({ children }) => <ol style={markdownStyles.ol}>{children}</ol>,
        li: ({ children }) => <li style={markdownStyles.li}>{children}</li>,
        
        // Цитаты
        blockquote: ({ children }) => <blockquote style={markdownStyles.blockquote}>{children}</blockquote>,
        
        // Ссылки
        a: ({ href, children }) => (
          <a 
            href={href} 
            style={markdownStyles.a} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        
        // Таблицы
        table: ({ children }) => <table style={markdownStyles.table}>{children}</table>,
        th: ({ children }) => <th style={markdownStyles.th}>{children}</th>,
        td: ({ children }) => <td style={markdownStyles.td}>{children}</td>,
        
        // Разделитель
        hr: () => <hr style={markdownStyles.hr} />,
        
        // Изображения
        img: ({ src, alt }) => (
          <img 
            src={src} 
            alt={alt || ''} 
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '4px',
              margin: '1em 0'
            }} 
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};