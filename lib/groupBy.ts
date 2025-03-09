export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<T[K] & string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = item[key] as keyof typeof result;
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<T[K] & string, T[]>);
}
