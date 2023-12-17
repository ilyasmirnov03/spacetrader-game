import {ApiResponse} from '../../models/api-response/api-response.ts';
import {url} from '../../constants/url.const.ts';
import {ErrorResponse} from '../../models/api-response/error-response.ts';

// Methods used in application
type HTTPMethod = 'get' | 'post' | 'patch';

export async function callApi<T>(
    endpoint: string,
    token: string | null,
    method: HTTPMethod = 'get',
    body: unknown = undefined,
): Promise<ApiResponse<T>> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    if (token) {
        headers.append('Authorization', `Bearer ${token}`)
    }
    const options: RequestInit = {
        method,
        headers,
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    return new Promise((resolve) => {
        fetch(`${url}${endpoint}`, options)
            .then(res => {
                if (res.ok) {
                    return res.json().then(data => {
                        resolve(data);
                    });
                } else {
                    res.json().then((data: ErrorResponse) => {
                        throw new Error(data.error.message);
                    });
                }
            });
    });
}