import { useEffect, useRef, useState } from 'react';

import { navigate } from 'astro:transitions/client';

export const useDebouncedValue = (value: string, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export interface SearchInputProps {
  searchBaseUrl: string;
  defaultValue?: string | undefined;
  focusOnLoad?: boolean;
}

export default function SearchInput({ searchBaseUrl, defaultValue, focusOnLoad }: Readonly<SearchInputProps>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(defaultValue ?? '');
  const debouncedValue = useDebouncedValue(value);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (document && inputRef.current) {
      if (focusOnLoad) {
        inputRef.current.focus();
      }
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

  useEffect(() => {
    void navigate(searchBaseUrl + debouncedValue);
  }, [debouncedValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void navigate(searchBaseUrl + e.currentTarget.value);
    }
  };

  return (
    <input
      ref={inputRef}
      autoComplete="off"
      onKeyDown={handleKeyDown}
      type="text"
      placeholder='Press "/" to search'
      value={value}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
      className="w-full border-b border-gray-500 p-4 hover:border-gray-50"
    />
  );
}
