import React, { useCallback, useState, memo, useMemo } from 'react';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertCodeBlock,
  BlockTypeSelect,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  type MDXEditorMethods,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface MdxEditorComponentProps {
  initialMarkdown?: string;
  onMarkdownChange?: (markdown: string) => void;
  readOnly?: boolean;
  className?: string;
}

export const MdxEditorComponent = memo(
  ({
    initialMarkdown = '# Hello world',
    onMarkdownChange,
    readOnly,
    className = '',
  }: MdxEditorComponentProps) => {
    const [markdown, setMarkdown] = useState(initialMarkdown);
    const editorRef = React.useRef<MDXEditorMethods>(null);

    const handleMarkdownChange = useCallback(
      (newMarkdown: string) => {
        setMarkdown(newMarkdown);
        onMarkdownChange?.(newMarkdown);
      },
      [onMarkdownChange]
    );

    const plugins = useMemo(
      () => [
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          imageUploadHandler: async () => {
            return 'https://via.placeholder.com/150';
          },
          imageAutocompleteSuggestions: ['https://via.placeholder.com/150'],
        }),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
        diffSourcePlugin({ viewMode: 'rich-text' }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <ListsToggle />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertCodeBlock />
              <BlockTypeSelect />
            </DiffSourceToggleWrapper>
          ),
        }),
      ],
      []
    );

    return (
      <div className={`editor-wrapper ${className}`}>
        <MDXEditor
          ref={editorRef}
          markdown={markdown}
          onChange={handleMarkdownChange}
          className='custom-mdx-editor'
          contentEditableClassName='custom-content-editable'
          readOnly={readOnly}
          plugins={plugins}
        />
      </div>
    );
  }
);
