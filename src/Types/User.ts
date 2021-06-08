export type PaginationVariables = { order?: Order; start?: number; limit?: number };

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
