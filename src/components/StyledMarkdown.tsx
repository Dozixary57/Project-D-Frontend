import Markdown, { Components } from "react-markdown";

interface StyledMarkdownProps {
  children: string;
}

const StyledMarkdown = ({ children }: StyledMarkdownProps) => {

  const components: Components = {
    p: ({ node, children, ...props }) => (
      <p style={styles.paragraph} {...props}>
        {children}
      </p>
    ),

    ul: ({ node, children, ...props }) => (
      <ul style={styles.unorderedList} {...props}>
        {children}
      </ul>
    ),

    li: ({ node, children, ...props }) => (
      <li style={styles.listItem} {...props}>
        {children}
      </li>
    ),

    blockquote: ({ node, children, ...props }) => (
      <blockquote style={styles.blockquote} {...props}>
        {children}
      </blockquote>
    ),
  };

  return (
    <div>
      <Markdown components={components}>
        {children}
      </Markdown>
    </div>
  );
};

export default StyledMarkdown;

const styles = {
  paragraph: {
    margin: "0",
    padding: "0.25em 0",
    textAlign: "justify",
    textIndent: "2em",
    lineHeight: "1.25em",
    whiteSpace: "pre-line",
  } as React.CSSProperties,

  unorderedList: {
    paddingLeft: "1.25em",
    margin: "1em 0",
    listStyleType: "square",
  },

  listItem: {
    textAlign: "justify",
    lineHeight: "1.25em",
    whiteSpace: "pre-line",
    padding: "0.25em 0",
  } as React.CSSProperties,

  blockquote: {
    margin: "0",
    boxSizing: "border-box",
    padding: "0.25em 1em 0.25em 1em",
    borderLeft: "0.25em solid rgba(255, 255, 255, 0.2)",
    borderRadius: "0.1em",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
};