const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeoutId: number | null;
  let resolveFunc: ((result: ReturnType<T>) => void) | null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        resolveFunc && resolveFunc(result);
      }, wait);

      resolveFunc = resolve;
    });
  };
};

export default debounce;
