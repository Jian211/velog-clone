
const BASE_URL = 'http://localhost:4000';

export const getTrandingList = () => {
    return fetch(`${BASE_URL}/posts`).then(res => res.json())
}


export const getCardDetail = (id:string) => fetch(`${BASE_URL}/posts/${id}`).then(res => res.json())

export const getSearchedPosts = (word:string) => {
    return fetch(`${BASE_URL}/posts?q=${word}`).then(res => res.json())
}
