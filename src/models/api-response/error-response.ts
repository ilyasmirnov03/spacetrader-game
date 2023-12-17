interface Error {
    message: string;
    code: number;
    data: unknown;
}

export interface ErrorResponse {
    error: Error;
}