# Installation

```bash
npm install --save @nodeteam/nestjs-prisma-pagination
```

# Usage

```typescript
// import paginators
import { paginator, searchPaginator } from '@nodeteam/nestjs-prisma-pagination';
// import types
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
```

# #Paginator

## Paginator options:
**page** - `page number`

**perPage** - `records per page`

## Paginator Arguments:
**orderBy**, **where**

```typescript
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

const paginatedResult: PaginatorTypes.PaginatedResult = await paginate(
    this.prisma.user,
    {
        where,
        orderBy,
        include: {
            name: true,
        },
    },
    {
        page,
    },
)
```

### Examples:

* Paginate records page: 1 and where: Jake 
```
https://exmaple.com/api/v1/user?page=1&where=Jake
```


# #Full-text Search Paginator

## Search Paginator options:

**page** - `page number`

**perPage** - `records per page`

**skip** - `offset sql`

**searchColumns** - `colums where you want to find searchValue`

**searchValue** - `string witch you whant to find`

## Search Paginator arguments:

**model*** - `prisma service`

**modelName*** - `name of table in db`

```typescript
const perPage = 10;
const searchPaginate: PaginatorTypes.SearchPaginateFunction = searchPaginator({ perPage });

const page = Number(pagination?.page || 1);
const skip = page > 0 ? perPage * (page - 1) : 0;

const searchValue = this.getSearchValue(search);

const searchOptions = {
    page,
    skip,
    searchValue,
}

const searchColumns = ['firstName', 'lastName', 'description'];

const paginatedResult: PaginatorTypes.PaginatedResult = await searchPaginate(
    this.prisma,
    'User',
    {
        ...searchOptions,
        searchColumns,
    },
);
```

### Examples:

* Paginate search records page: 1 and searchValue: Lions
```
https://example.com/api/v1/users/full-text/search?search=Lions&page=1
```
