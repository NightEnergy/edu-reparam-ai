/** Groups an array by a key derived from each item. */
export function groupBy<T>(array: T[], key: (item: T) => string): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const group = key(item);
    acc[group] = acc[group] ?? [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/** Returns unique items from an array. */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}
