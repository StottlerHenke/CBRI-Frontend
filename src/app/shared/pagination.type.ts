export interface Pagination {
    count: number;
    page_count: number;
    next: string | null;
    previous: string | null;
    results: any;
}
