"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const getOrderByWithTieBreaker = (args = {}, defaultOptions = {}) => {
    const { orderByTieBreakerPropertyName } = defaultOptions;
    if (!orderByTieBreakerPropertyName || !args.orderBy) {
        return args.orderBy;
    }
    return [
        ...((args.orderBy instanceof Array) ? args.orderBy : [args.orderBy]),
        { [orderByTieBreakerPropertyName]: 'asc' },
    ];
};
const paginator = (defaultOptions) => {
    return async (model, args = { where: undefined }, options) => {
        const page = Number(options?.page || defaultOptions?.page) || 1;
        const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
        const orderBy = getOrderByWithTieBreaker(args, defaultOptions);
        const skip = page > 0 ? perPage * (page - 1) : 0;
        const [total, data] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                orderBy,
                take: perPage,
                skip,
            }),
        ]);
        const lastPage = Math.ceil(total / perPage);
        return {
            data,
            meta: {
                total,
                lastPage,
                currentPage: page,
                perPage,
                prev: page > 1 ? page - 1 : null,
                next: page < lastPage ? page + 1 : null,
            },
        };
    };
};
exports.paginator = paginator;
//# sourceMappingURL=paginator.js.map