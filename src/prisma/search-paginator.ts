import { PaginatorTypes } from "../../index";

export const searchPaginator = (defaultOptions: PaginatorTypes.SearchPaginateOptions): PaginatorTypes.SearchPaginateFunction => {
  return async <T>(prisma: any, modelName: string, options: any) => {
    let data: T & { row_count: number }[];

    if (options?.searchValue) {
      data = await prisma.$queryRawUnsafe(`
        SELECT *,
        (SELECT COUNT(*) FROM "${modelName}"
          WHERE to_tsvector('english',
          ${options.searchColumns.map((c: string) => `coalesce("${c}", '')`).join(" || ' ' || \n")}
          ) @@ to_tsquery('english', '${options.searchValue}')) AS row_count
        FROM "${modelName}"
        WHERE to_tsvector('english',
          ${options.searchColumns.map((c: string) => `coalesce("${c}", '')`).join(" || ' ' || \n")}
          ) @@ to_tsquery('english', '${options.searchValue}')
          limit ${options.perPage}
          offset ${options.skip};
      `);
    } else {
      data = await prisma.$queryRawUnsafe(`
         SELECT *,
        (SELECT COUNT(*) FROM "${modelName}") as row_count
        FROM "${modelName}"
        limit ${options.perPage}
        offset ${options.skip};
        `);
    }

    const total = Number(data[0]?.row_count || 0);
    const lastPage = Math.ceil((total) / (options?.perPage || defaultOptions.perPage));

    return {
      data: data as unknown as T[],
      meta: {
        total,
        lastPage,
        currentPage: options?.page || 1,
        perPage: options?.perPage || 10,
        prev: options?.page > 1 ? (options?.page || defaultOptions.page) - 1 : null,
        next: options?.page < lastPage ? (options?.page || defaultOptions.page) + 1 : null,
      },
    };
  };
};
