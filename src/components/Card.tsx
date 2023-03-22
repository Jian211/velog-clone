import React from 'react'
import { ICard } from '../store/atom'
import '../styles/card.scss'
import { ReactComponent as Heart } from '../images/heart.svg'
import { ReactComponent as User } from '../images/user-profile-icon.svg'

const Card = ({id,title,short_description,comments_count,is_private,likes,released_at,tags,thumbnail,updated_at,url_slug,user}:ICard) => {

    return (
        <article className='card-container'>
            <div className='card-container__image-form'>
                <img src= {thumbnail+''}/>
            </div>

            <div className='card-container__content-form'>
                <h4>{title}</h4>
                <div>{short_description}</div>
                <div>
                    <span>2023년 2월 27일 </span>
                    <span>{comments_count}개의 댓글</span>
                </div>
            </div>
            <hr />

            <div className='card-container__authorAndLikes'>
                <div>
                    {/* <img src={user.profile+''} /> 유저이미지 정보를 받을 수 없음 */}
                    <User width={24}/>
                    <span>by&nbsp;<h6>{user.username}</h6></span>
                </div>
                <div>
                    <Heart />
                    <span>{likes}</span>
                </div>
            </div>
        </article>
    )
}

export default Card