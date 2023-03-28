import { atom, selector, selectorFamily } from "recoil"

import {getTrandingList} from '../api'
import { getPeriodDiff } from "../lib/getPeriod"

export interface ICard {
    id: string,
    title: string,
    released_at: string,
    updated_at: string,
    tags: string[],
    body:string,
    short_description: string,
    is_markdown: boolean,
    is_private: boolean,
    is_temp: boolean,
    thumbnail: string | null,
    comments_count: number,
    url_slug: string,
    likes: number,
    liked:boolean,
    user: {
        id: string,
        username: string,
        profile: {
            id: string,
            thumbnail: string,
            short_bio: string,
            profile_links: object,
        },
        velog_config :{
            title:string,
        }
    },
    comments:[{
        created_at: string,
        deleted : boolean,
        id: string,
        level: number,
        replies_count: number, 
        text:string,
        user :{
            id:string,
            profile: {
                id:string,
                thumbnail: string
            },
            username:string
        }
    }],
    series :{
        id:string,
        name:string,
        url_slug: string,
        series_posts:[
            {
                id:string,
                post:{
                    id:string,
                    title:string,
                    url_slug:string,
                    user:User
                }
            }
        ]
    },
    linked_posts: {
        previous: {
            id:string,
            title: string,
            url_slug: string,
            user: User
        }
    }
   
}
type User = {
    id:string,
    username:string
}

export interface ICardList {
    list: ICard[]
}

export interface ILocalStorage {
    velogClone:{
        darkmode : boolean,
        card : {
            dayFilter : string,
            categorys : {
                tranding : boolean,
                recent : boolean,
                popular : boolean
            },
            pageMode: "page"| "scroll"
        }
    }
}

interface ISelectPeriodData {
    [key: string] :(arr:ICard[]) => ICard[]
}
const selectPeriodData:ISelectPeriodData = {
    all   : (arr) => [...arr],
    day   : (arr) => [...arr.filter( ({released_at}) => getPeriodDiff(released_at) < 2)],
    week  : (arr) => [...arr.filter( ({released_at}) => getPeriodDiff(released_at) < 8)],
    month : (arr) => [...arr.filter( ({released_at}) => getPeriodDiff(released_at, 30) < 1 )],
    year  : (arr) => [...arr.filter( ({released_at}) => getPeriodDiff(released_at, 365) < 1 )],
}

export const initUserSetting = atom({
    key: "initSetting",
    default : {
        velogClone : {
            darkmode : false,
            card : {
                dayFilter : "all",
                categorys : {
                    tranding : true,
                    recent : false,
                    popular : false
                }
            },
            pageMode: "page",
        }
    }
})

export const currPeriod = atom({
    key: "perios",
    default: "all",
})

export const cardListData = atom<ICard[]>({
    key: "cardList",
    default : getTrandingList()
})

export const cardFilterData = selectorFamily({
    key:"cardFiler",
    get: () => ({get}) => {
        const period = get(currPeriod)
        const list = get(cardListData)
        return selectPeriodData[period](list)
    },
})

export const scrollCardData = selector({
    key:"scrollCardData",
    get: ({get}) => {
        const period = get(currPeriod)
        const list = get(cardListData)
        return selectPeriodData[period](list)  
    }
})

export const scrollCardDataList = selectorFamily({
    key:"scrollCardDataList",
    get: (limit) => ({get}) => {
        const currList = get(scrollCardData);
        const length =  Number(limit) * get(scrollCnt)
        return currList.slice(0, length);
    },
})

export const scrollCnt = atom({
    key:"scrollCnt",
    default: 1
})

export const pageMode = selector({
    key: "pageMode",
    get: ({get}) => {
        const pageMode = get(initUserSetting);
        return pageMode.velogClone.pageMode;
    },
})

export const searchedList = atom<ICard[]>({
    key:"searchedList",
    default:[]
})





