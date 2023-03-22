
const BASE_URL = 'http://localhost:4000';

export const getTrandingList = () => {
    return fetch(`${BASE_URL}/posts`).then(res => res.json())
}
