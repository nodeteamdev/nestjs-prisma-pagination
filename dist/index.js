"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedResult = exports.getPagination = exports.paginator = exports.searchPaginator = void 0;
const search_paginator_1 = require("./prisma/search-paginator");
Object.defineProperty(exports, "searchPaginator", { enumerable: true, get: function () { return search_paginator_1.searchPaginator; } });
const paginator_1 = require("./prisma/paginator");
Object.defineProperty(exports, "paginator", { enumerable: true, get: function () { return paginator_1.paginator; } });
const get_paginated_result_1 = require("./prisma/get-paginated-result");
Object.defineProperty(exports, "getPagination", { enumerable: true, get: function () { return get_paginated_result_1.getPagination; } });
Object.defineProperty(exports, "getPaginatedResult", { enumerable: true, get: function () { return get_paginated_result_1.getPaginatedResult; } });
//# sourceMappingURL=index.js.map