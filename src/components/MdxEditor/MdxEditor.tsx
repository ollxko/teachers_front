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
  InsertTable,
  BlockTypeSelect,
  tablePlugin,
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

    return (
      <div className={`editor-wrapper ${className}`}>
        <MDXEditor
          ref={editorRef}
          markdown={markdown}
          onChange={handleMarkdownChange}
          className='custom-mdx-editor'
          contentEditableClassName='custom-content-editable'
          readOnly={readOnly}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            tablePlugin(),
            diffSourcePlugin({ viewMode: 'rich-text' }),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <DiffSourceToggleWrapper>
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    <CodeToggle />
                    <ListsToggle />
                    <InsertTable />
                    <BlockTypeSelect />
                  </DiffSourceToggleWrapper>
                </>
              ),
            }),
          ]}
        />
      </div>
    );
  }
);
