import { useRef, useEffect, useCallback } from "react";

const createFileInput = () => {
  const newFileInput = document.createElement("input");
  newFileInput.type = "file";
  return newFileInput;
};

type FileChangeEventHandler = (ev: Event) => void;

interface ReturnType {
  openFileExplorer: () => void;
  activeFiles: FileList | null;
  clearFiles: () => void;
}

interface Params {
  eventHandler?: FileChangeEventHandler;
}

export default function useFileExplorer({ eventHandler }: Params): ReturnType {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const prevEventHandler = useRef<FileChangeEventHandler | undefined>();

  const removeEventHandler = useCallback(() => {
    if (prevEventHandler.current) {
      inputRef.current?.removeEventListener("change", prevEventHandler.current);
    }
  }, []);

  const openFileExplorer = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const clearFiles = useCallback(() => {
    if (inputRef.current) {
      if (prevEventHandler.current) removeEventHandler();
      inputRef.current = createFileInput();
    }
  }, [removeEventHandler]);

  useEffect(() => {
    inputRef.current = createFileInput();

    /* Clean the ref */
    return () => {
      inputRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (eventHandler) {
      inputRef.current?.addEventListener("change", eventHandler);
      prevEventHandler.current = eventHandler;
    }

    return removeEventHandler;
  }, [eventHandler, removeEventHandler]);

  return {
    openFileExplorer,
    clearFiles,
    activeFiles: inputRef.current?.files ?? null,
  };
}
