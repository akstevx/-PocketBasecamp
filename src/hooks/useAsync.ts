import { useState } from 'react';

type AsyncFunction<T> = () => Promise<T>;

type UseAsyncReturn = {
  isLoading: boolean;
  errorMessage: string;
  execute: <T>(asyncFunction: AsyncFunction<T>) => Promise<T | null>;
  clearError: () => void;
};

export function useAsync(): UseAsyncReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function execute<T>(
    asyncFunction: AsyncFunction<T>
  ): Promise<T | null> {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const result = await asyncFunction();

      return result;
    } catch (error) {
      setErrorMessage('Something went wrong.');

      return null;
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setErrorMessage('');
  }

  return {
    isLoading,
    errorMessage,
    execute,
    clearError,
  };
}