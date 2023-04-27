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

Options can be redefined

## Paginator Arguments:
**orderBy**, **where**

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

#### Set options as default:

```typescript
const paginate: PaginatorTypes.PaginateFunction = paginator({
    page: 1,
    perPage: 10,
});
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

**page** - `page number`

**perPage** - `records per page`

**skip** - `offset sql`

**searchColumns** - `colums where you want to find searchValue`

**searchValue** - `string witch you whant to find`

Options can be redefined

## Search Paginator arguments:

**model*** - `prisma service`

**modelName*** - `name of table in db`

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

#### Set options as default:

```typescript
const searchPaginate: PaginatorTypes.SearchPaginateFunction = searchPaginator({
    page: 1,
    perPage: 10,
});
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
