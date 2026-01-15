export const markdownStyles = {
  h1: { fontSize: '2em', margin: '1em 0 0.5em', fontWeight: 600 },
  h2: { fontSize: '1.5em', margin: '1em 0 0.5em', fontWeight: 600 },
  h3: { fontSize: '1.25em', margin: '1em 0 0.5em', fontWeight: 600 },
  h4: { fontSize: '1.1em', margin: '1em 0 0.5em', fontWeight: 600 },
  p: { marginBottom: '1em', lineHeight: 1.6 },
  ul: { marginBottom: '1em', paddingLeft: '2em' },
  ol: { marginBottom: '1em', paddingLeft: '2em' },
  li: { marginBottom: '0.5em' },
  blockquote: { 
    borderLeft: '4px solid #ddd', 
    margin: '1em 0', 
    paddingLeft: '1em', 
    color: '#666',
    fontStyle: 'italic'
  },
  code: { 
    backgroundColor: '#f6f8fa', 
    padding: '2px 6px', 
    borderRadius: '4px', 
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    fontSize: '85%'
  },
  pre: { 
    backgroundColor: '#f6f8fa', 
    borderRadius: '6px', 
    padding: '16px', 
    overflow: 'auto',
    marginBottom: '1em'
  },
  a: { 
    color: '#1890ff', 
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' }
  },
  table: {
    borderCollapse: 'collapse',
    marginBottom: '1em',
    width: '100%',
    fontSize: '14px'
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px 12px',
    backgroundColor: '#f5f5f5',
    fontWeight: 600,
    textAlign: 'left'
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px 12px'
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #ddd',
    margin: '2em 0'
  },
  strong: {
    fontWeight: 600
  },
  em: {
    fontStyle: 'italic'
  }
} as const;