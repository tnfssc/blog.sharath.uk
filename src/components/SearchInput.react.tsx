import { useEffect, useRef } from 'react';

export interface SearchInputProps {
  searchBaseUrl: string;
  defaultValue?: string | undefined;
}

export default function SearchInput({ searchBaseUrl, defaultValue }: Readonly<SearchInputProps>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (document && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(defaultValue?.length ?? 0, defaultValue?.length ?? 0);
    }
  }, [defaultValue]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (document) {
      window.addEventListener('keydown', handler);
    }
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.location.href = searchBaseUrl + e.currentTarget.value;
    }
  };

  return (
    <input
      ref={inputRef}
      autoComplete="off"
      onKeyDown={handleKeyDown}
      type="text"
      placeholder='Press "/" to search'
      defaultValue={defaultValue}
      className="w-full border-b border-gray-500 p-4 hover:border-gray-50"
    />
  );
}
