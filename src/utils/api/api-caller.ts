import {ApiResponse} from '../../models/api-response/api-response.ts';
import {url} from '../../constants/url.const.ts';

// Methods used in application
type HTTPMethod = 'get' | 'post' | 'patch';

export async function callApi<T>(
    endpoint: string,
    token: string | null,
    method: HTTPMethod = 'get',
    body: unknown = undefined,
): Promise<ApiResponse<T>> {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    return new Promise((resolve, reject) => {
        fetch(`${url}${endpoint}`, options)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => {
                console.error('Error while fetching', err);
                reject(err);
            });
    });
}