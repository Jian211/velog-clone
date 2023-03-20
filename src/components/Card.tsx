import React from 'react'
import { ICard } from '../store/atom'
import '../styles/card.scss'

const Card = ({id,title,short_description,comments_count,is_private,likes,released_at,tags,thumbnail,updated_at,url_slug,user}:ICard) => {

    return (
        <article className='card-container'>
            <div className='card_image-form'>
                <img src= {thumbnail+''}/>
            </div>
            <div className='card_content-form'>
                <h4>{title}</h4>
                <textarea>
                    나니나니
                </textarea>
                <div>2023년 2월 27일 2개의 댓글</div>
            </div>
            <div>
                <div>
                    <img src={''} />
                    <span>by 유저이름</span>
                </div>
                <div>
                    하트이미지
                    <span>120</span>
                </div>
            </div>
        </article>
    )
}

export default Card