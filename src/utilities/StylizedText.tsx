import { useEffect } from 'react';

const CellStyledTitleWithShadow = ({ text }: { text: string | number | null }) => {
  const className = 'CellTitle';

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .${className} {
        position: absolute;
        font-size: 0.9em;
        color: white;
        margin: 0;
        left: 0.5em;
        bottom: 0.5em;
        z-index: 2;
        overflow: visible;
      }

      .${className}::after {
        content: '';
        position: absolute;
        top: -20%;
        left: -0.25em;
        width: 150%;
        height: 140%;
        border-radius: 0.1em;
        z-index: -1;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0));
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (text === null || text === undefined) {
    return null;
  }

  return <p className={className}>{text}</p>;
};

const CellStyledAmountWithShadow = ({ text }: { text: string | number | null }) => {
  const className = 'CellAmount';

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .${className} {
        position: absolute;
        font-size: 0.9em;
        color: white;
        margin: 0;
        top: 0.25em;
        right: 0.225em;
        padding: 0.15em 0.15em 0.10em 0.25em;
        border-radius: 0.1em;
        z-index: 2;
        overflow: visible;
        background-color: rgba(0, 0, 0, 0.15);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (text === null || text === undefined) {
    return null;
  }

  return <p className={className}>{text}</p>;
};

export {
  CellStyledTitleWithShadow,
  CellStyledAmountWithShadow
};