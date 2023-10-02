import {useEffect, useRef, useState} from 'react';

export const useViewModel = <TResult, TParams = any>(
  VmConstructor: new (params: TParams) => TResult,
  params?: TParams | any,
): TResult => {
  const vmRef: any = useRef<TResult>(null);
  if (!vmRef.current) {
    vmRef.current = new VmConstructor(params);
  }
  return vmRef.current;
};

export const useDebounce = (value: any, delay?: number): any => {
  const [debounceValue, setDebounceValue] = useState();
  const timerRef: any = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebounceValue(value), delay || 1000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [delay, value]);

  return debounceValue;
};
