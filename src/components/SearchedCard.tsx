import React,{forwardRef} from 'react'
import { showReleseDate } from '../lib/getPeriod'
import { ICard } from '../store/atom'
import '../styles/searchedCard.scss'

import { useNavigate } from 'react-router-dom'


const SearchedCard = (
    {id,comments_count,tags,thumbnail,title,released_at,user,short_description}:ICard,
    cardRef : React.ForwardedRef<HTMLDivElement> | null
) => {
    const navigate = useNavigate();

    return (
        <div className='searchedCard-container' onClick={() => navigate(`/card/${id}`)} ref={cardRef}>
            <div className='searchedCard-container__userInfo'>
                <img src={user.profile.thumbnail} />
                <h4>{user.username}</h4>
            </div>
            {thumbnail && 
                <div className='searchedCard-container__thumnail'>
                    <img src={thumbnail} />
                </div>
            }
            <h2>{title}</h2>
            <p>{short_description}</p>
            <ul>
                {tags.map(tag => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
            <div>
                <span>{showReleseDate(released_at)}</span>
                <span>{comments_count}개의 댓글</span>
                <span>♥</span>
            </div>
        </div>
    )
}

export default forwardRef(SearchedCard)