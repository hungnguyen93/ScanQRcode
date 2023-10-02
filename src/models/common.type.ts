export interface DTO {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMetaData {
  totalItems?: number;
  itemCount?: number;
  itemsPerPage?: number;
  totalPages: number;
  currentPage: number;
}

export interface IResponseData<T> {
  items: T[];
  meta: IMetaData;
}
