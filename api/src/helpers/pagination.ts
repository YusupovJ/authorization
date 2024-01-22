class Pagination {
    totalItems: number;
    currentPage: number;
    limit: number;
    offset: number;
    totalPages: number;

    constructor(totalItems: number, page: number, limit: number) {
        this.totalItems = totalItems;
        this.currentPage = page || 1;
        this.limit = limit || 15;
        this.offset = (this.page - 1) * limit;
        this.totalPages = Math.floor(this.totalItems / this.limit);
    }
}

export default Pagination;
