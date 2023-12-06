
interface MetaResponse {
    total: number;
    page: number;
    limit: number;
}
export interface ApiResponse {
    data: unknown;
    meta?: MetaResponse;
}