import { atom } from "recoil"

import {getTrandingList} from '../api'

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
    liekd:boolean,
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
    comments:[],
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

export const initUserSetting = atom({
    key: "initSetting",
    default : {
        velogClone : {
            darkmode : false,
            card : {
                dayFilter : {
                    all : true,
                    today : false,
                    week : false,
                    month : false,
                    year : false
                },
                categorys : {
                    tranding : true,
                    recent : false,
                    popular : false
                }
            }
        }
    }
})

export const cardListData = atom<ICard[]>({
    key: "cardList",
    default : getTrandingList()
})

// export const trandingCaraData = selector<ICard[]>({
//     key:'tranding',
//     get: ({get}) => {
//         const {velogClone : {card : {categorys}}} = get(initUserSetting);
//         const [[target]] = Object.entries(categorys).filter( cate =>  cate[1] )
//         return  getTrandingList()
//     }
// })

// // recent
// export const recentCardData = selector({
//     key: "recentList",
//     get: ({get}) => {
//         const allCardList = get(cardListData);
//         // 업데이트 날짜로 정렬하기 
//         console.log(allCardList,"전")
//         allCardList.sort((a, b) => {
//             return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
//         })
//         // 여기서 에러발생
//         console.log(allCardList,"후")
//         return "recent"
//     }
// });