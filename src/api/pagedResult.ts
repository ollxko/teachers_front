export type PagedResult<T> = {
  take: number;
  orderFieldName: string;
  orderType: string;
  cursorType: string;
  items: T[];
  actualTake: number;
};