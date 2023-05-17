import { searchPaginator } from './prisma/search-paginator';
import { paginator } from './prisma/paginator';
import { PaginatorTypes } from '../index';
import { getPagination, getPaginatedResult } from './prisma/get-paginated-result';

export {
  searchPaginator,
  paginator,
  PaginatorTypes,
  getPagination,
  getPaginatedResult,
};
