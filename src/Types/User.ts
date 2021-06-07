export type PaginationVariables = { order?: string; start?: number; limit?: number };

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
