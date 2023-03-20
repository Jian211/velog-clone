import { atom } from "recoil"
import listData from '../db.json'


export interface ICard {
    id: string,
    title: string,
    short_description: string,
    thumbnail: string | null,
    likes: number,
    user: {
        id: string,
        username: string,
        profile: {
            id: string,
            thumbnail: string,
        },
    },
    url_slug: string,
    released_at: string,
    updated_at: string,
    comments_count: number,
    tags: string[],
    is_private: boolean,
}

export interface ICardList {
    list: ICard[]
}

export const cardListData = atom<ICardList>({
    key: "cardList",
    default : listData
})