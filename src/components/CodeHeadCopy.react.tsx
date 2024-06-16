import { useCallback } from 'react';

export const CodeHeadCopyReact: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const codeBlock = e.currentTarget.parentElement?.parentElement?.nextElementSibling?.querySelector('code');
    if (codeBlock?.textContent) {
      const text = codeBlock.textContent;
      void navigator.clipboard.writeText(text);
    }
  }, []);

  return <button onMouseDown={handleClick} {...props} />;
};
