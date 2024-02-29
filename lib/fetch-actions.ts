class FetchActions {
    private _baseURL: string = process.env.BASE_URL || 'http://localhost:3000/api';

    private async handleResponse(response: Response) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    }

    public async get(url: string) {
        const response = await fetch(`${this._baseURL}/${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, max-age=10',
                // 'Cache-Control': 'no-cache, no-store, must-revalidate',
                Pragma: 'no-cache',
                Expires: '0',
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return this.handleResponse(response);
    }
}

export const fetchActions = new FetchActions();
