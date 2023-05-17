import { PaginatorTypes } from '../../index';
export declare const getPagination: (rawPage?: number | string, rawPerPage?: number | string) => PaginatorTypes.Pagination;
export declare const getPaginatedResult: <T>({ data, pagination, count, }: {
    data: T[];
    pagination: PaginatorTypes.Pagination;
    count?: string | number | undefined;
}) => PaginatorTypes.PaginatedResult<T>;
