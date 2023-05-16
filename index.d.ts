export namespace PaginatorTypes {
    export interface PaginatedResult<T> {
        data: T[];
        meta: {
            total: number;
            lastPage: number;
            currentPage: number;
            perPage: number;
            prev: number | null;
            next: number | null;
        };
    }

    export type PaginateOptions = {
        page?: number | string;
        perPage?: number | string;
    };

    export type PaginateFunction = <T, K>(model: any, args?: K, options?: PaginateOptions) => Promise<PaginatedResult<T>>;

    export type SearchPaginateOptions = {
        page?: number | string;
        perPage?: number | string;
        skip?: number | string;
        searchColumns?: string[];
        searchValue?: string;
    };
    export type SearchPaginateFunction = <T>(model: any, modelName: string, options?: SearchPaginateOptions) => Promise<PaginatedResult<T>>;

    export interface Pagination {
        page: number;
        perPage: number;
        skip: number;
    }
}
