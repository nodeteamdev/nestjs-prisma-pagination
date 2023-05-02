"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
describe('Search Paginator', () => {
    const searchPaginate = (0, src_1.searchPaginator)({ perPage: 10 });
    const prisma = {
        $queryRawUnsafe: jest.fn(async (query) => [
            {
                id: 1,
                name: 'string',
                description: 'Red',
                row_count: 2,
            },
            {
                id: 2,
                name: 'string',
                description: 'Blue',
                row_count: 2,
            }
        ]),
    };
    it('Should return all records paginated with search response', async () => {
        const modelName = 'Users';
        const searchColumns = ['name', 'description'];
        const options = {
            searchColumns,
        };
        const expectedValue = {
            data: [
                {
                    id: 1,
                    name: 'string',
                    description: 'Red',
                    row_count: 2,
                },
                {
                    id: 2,
                    name: 'string',
                    description: 'Blue',
                    row_count: 2,
                }
            ],
            meta: {
                total: 2,
                lastPage: Math.ceil(2 / 10),
                currentPage: 1,
                perPage: 10,
                prev: 1 > 1 ? 1 - 1 : null,
                next: 1 < Math.ceil(1 / 10) ? 1 + 1 : null,
            }
        };
        const paginatedResult = await searchPaginate(prisma, modelName, options);
        expect(paginatedResult).toEqual(expectedValue);
    });
    it('Should return only one record from search paginator', async () => {
        jest.spyOn(prisma, '$queryRawUnsafe').mockReturnValueOnce(new Promise((resolve) => {
            resolve([
                {
                    id: 2,
                    name: 'string',
                    description: 'Blue',
                    row_count: 1,
                }
            ]);
        }));
        const modelName = 'Users';
        const searchColumns = ['name', 'description'];
        const options = {
            searchValue: 'Blue',
            searchColumns,
        };
        const expectedValue = {
            data: [
                {
                    id: 2,
                    name: 'string',
                    description: 'Blue',
                    row_count: 1,
                }
            ],
            meta: {
                total: 1,
                lastPage: Math.ceil(1 / 10),
                currentPage: 1,
                perPage: 10,
                prev: 1 > 1 ? 1 - 1 : null,
                next: 1 < Math.ceil(1 / 10) ? 1 + 1 : null,
            }
        };
        const paginatedResult = await searchPaginate(prisma, modelName, options);
        expect(paginatedResult).toEqual(expectedValue);
    });
    it('Should return paginated response (perPage: 1, page: 2)', async () => {
        jest.spyOn(prisma, '$queryRawUnsafe').mockReturnValueOnce(new Promise((resolve) => {
            resolve([
                {
                    id: 2,
                    name: 'string',
                    description: 'Blue',
                    row_count: 2,
                }
            ]);
        }));
        const modelName = 'Users';
        const searchColumns = ['name', 'description'];
        const options = {
            searchValue: 'string',
            page: 2,
            perPage: 1,
            searchColumns,
        };
        const expectedValue = {
            data: [
                {
                    id: 2,
                    name: 'string',
                    description: 'Blue',
                    row_count: 2,
                }
            ],
            meta: {
                total: 2,
                lastPage: Math.ceil(2 / options.perPage),
                currentPage: options.page,
                perPage: options.perPage,
                prev: options.page > 1 ? options.page - 1 : null,
                next: options.page < Math.ceil(options.page / options.perPage) ? options.page + 1 : null,
            }
        };
        const paginatedResponse = await searchPaginate(prisma, modelName, options);
        expect(paginatedResponse).toEqual(expectedValue);
    });
});
//# sourceMappingURL=search-paginator.spec.js.map