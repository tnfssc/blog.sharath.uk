import { useCallback, useEffect, useState } from 'react';

export const CodeHeadCopyReact: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & { copiedIcon?: React.ReactNode }
> = ({ children, copiedIcon = children, ...props }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const codeBlock = e.currentTarget.parentElement?.parentElement?.nextElementSibling?.querySelector('code');
    if (codeBlock?.textContent) {
      const text = codeBlock.textContent;
      void navigator.clipboard.writeText(text);
      setCopied(true);
    }
  }, []);

  return (
    <button onMouseDown={handleClick} {...props}>
      {copied ? copiedIcon : children}
    </button>
  );
};
