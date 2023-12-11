
interface MetaResponse {
    total: number;
    page: number;
    limit: number;
}
export interface ApiResponse<T> {
    data: T;
    meta?: MetaResponse;
}