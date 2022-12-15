export class PageableResponse<T> {
  currentPage?: number;
  currentSize?: number;
  totalPage?: number;
  numberOfElements?: number;
  items?: T
}
