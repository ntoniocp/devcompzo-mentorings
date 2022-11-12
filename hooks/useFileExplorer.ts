import { useRef, useEffect } from 'react';

type FileChangeEventHandler = (ev: Event) => void;

interface FileExplorerMethods {
  openFileExplorer: () => void;
}

interface Params {
  eventHandler?: FileChangeEventHandler;
}

export default function useFileExplorer({
  eventHandler,
}: Params): FileExplorerMethods {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const prevEventHandler = useRef<FileChangeEventHandler | undefined>();

  useEffect(() => {
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    inputRef.current = newFileInput;

    /* Clean the ref */
    return () => {
      inputRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (eventHandler) {
      inputRef.current?.addEventListener('change', eventHandler);
      prevEventHandler.current = eventHandler;
    }

    return () => {
      if (prevEventHandler.current) {
        inputRef.current?.removeEventListener(
          'change',
          prevEventHandler.current
        );
      }
    };
  }, [eventHandler]);

  return { openFileExplorer: () => inputRef.current?.click() };
}
