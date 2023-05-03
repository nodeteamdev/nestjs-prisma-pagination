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
`page` - number of page

`perPage` - number of records per page

Options can be redefined

## Return type:

```typescript
{
    data: T[],
    meta: {
        total: number,
        lastPage: number,
        currentPage: number,
        perPage: number,
        prev: number | null,
        next: number | null,
    },
}
```

## Example:

Create new paginator function with default options

```typescript
const paginate: PaginatorTypes.PaginateFunction = paginator({
    page: 1,
    perPage: 10,
});
```

full example:

```typescript
import PrismaService from '@providers/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export default class UserService {
    constructor(private prisma: PrismaService) {}

    async findMany({ where, orderBy, pagination }: {
        where?: Prisma.UserWhereInput,
        orderBy?: Prisma.UserOrderByWithRelationInput
        page?: number,
        perPage?: number,
    }): Promise<PaginatorTypes.PaginatedResult<User>> {
        return paginate(
            this.prisma.user,
            {
                where,
                orderBy,
            },
            {
                page,
                perPage,
            },
        );
    }
}
```

#### Redefine options:
```typescript
        paginate(
            this.prisma.user,
            {
                where,
                orderBy,
            },
            {
                page: 2,  // Rendefine page
                perPage: 5, // Rendefine perPage
            },
        );
```


### Examples:

* Paginate records page: 1 and where: Jake 
```
https://exmaple.com/api/v1/user?page=1&where=Jake
```


# #Full-text Search Paginator

## Search Paginator options:

`page` - number of page

`perPage` - number of records per page

`skip` - number of records to skip

`searchColumns` - array of columns in db

`searchValue` - string to search

Options can be redefined

## Search Paginator arguments:

`model` - `PrismaClient['modelName']`

`modelName` - Name of model

create new search paginator function with default options

```typescript
const searchPaginate: PaginatorTypes.SearchPaginateFunction = searchPaginator({
  page: 1,
  perPage: 10,
});
```

full example:

```typescript
import PrismaService from '@providers/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginatorTypes, searchPaginator } from '@nodeteam/nestjs-prisma-pagination';

const searchPaginate: PaginatorTypes.SearchPaginateFunction = searchPaginator({ perPage: 10 });

@Injectable()
export default class UserService {
    constructor(private prisma: PrismaService) {}

    async searchUser({
        page,
        perPage,
        skip,
        searchValue
    }: {
        page: number,
        perPage: number,
        skip: number,
        searchValue?: string,
    }): Promise<PaginatorTypes.PaginatedResult<User>> {
        const searchColumns = ['firstName', 'lastName', 'description'];

        return searchPaginate(
            this.prisma,
            'User',
            {
                page,
                perPage,
                skip,
                searchValue,
                searchColumns,
            },
        );
    }
}
```

#### Redefine options:
```typescript
        searchPaginate(
            this.prisma, 
            'User',
            {
                page: 2,  // Rendefine page
                perPage: 5, // Rendefine perPage
                skip,
                searchValue,
                searchColumns,
            },
        );
```

### Examples:

* Paginate search records page: 1 and searchValue: Lions
```
https://example.com/api/v1/users/full-text/search?search=Lions&page=1
```

Check useful npm packages from NodeTeam: https://www.npmjs.com/org/nodeteam
