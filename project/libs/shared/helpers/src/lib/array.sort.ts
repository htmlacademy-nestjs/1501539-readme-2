export type SortDirection = 'asc' | 'desc'

export const sort = <T>(
  items: T[],
  selector: (item: T) => number | string | Date,
  direction: SortDirection = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = selector(a);
    const bVal = selector(b);

    let comparison = 0;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal;
    }
    else if (aVal instanceof Date && bVal instanceof Date) {
      comparison = aVal.getTime() - bVal.getTime();
    }
    else {
      const aDate = new Date(aVal as string);
      const bDate = new Date(bVal as string);

      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        comparison = aDate.getTime() - bDate.getTime();
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}
