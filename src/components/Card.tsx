import React,{forwardRef} from 'react'
import { ICard } from '../store/atom'
import '../styles/card.scss'
import { ReactComponent as Heart } from '../images/heart.svg'
import { useNavigate } from 'react-router-dom'
import { showReleseDate } from '../lib/getPeriod'


const Card = (
        {id,title,short_description,comments_count,likes,released_at,thumbnail,user}:ICard,
        cardRef: React.ForwardedRef<HTMLDivElement> | null
    ) => {
    
    const navigate = useNavigate();
    
    const handleDetail = () => navigate(`/card/${id}`)
  
    return (
        <div className='card-container' ref={cardRef} onClick={handleDetail} >

            {thumbnail &&
                <div className='card-container__image-form'>
                    <img src= {thumbnail+''}/>
                </div>
            }

            <div className='card-container__content-form'>
                <h4>{title}</h4>
                <div>{short_description}</div>
                <div>
                    <span>{showReleseDate(released_at)}</span>
                    <span>{comments_count}개의 댓글</span>
                </div>
            </div>
            <hr />

            <div className='card-container__authorAndLikes'>
                <div>
                    <span>
                        <img src={user.profile.thumbnail} />
                    </span>
                    {/* <User width={24}/> */}
                    <span>by&nbsp;<h6>{user.username}</h6></span>
                </div>
                <div>
                    <Heart />
                    <span>{likes}</span>
                </div>
            </div>
        </div>
    )
}

export default forwardRef<HTMLDivElement | null, ICard>(Card)