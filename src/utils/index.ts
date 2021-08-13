import { useState, useEffect } from "react";

// object类型可能是{键值对}、函数、数组等多种类型

const isFalsy = (value: any) => (value === 0 ? false : !value);
export const clearnObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceVal] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceVal(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useDocumentTitle = (title: string, keepOnUnmount: boolean) => {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  });
};
