import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCardDetail } from '../api'
import { ICard } from '../store/atom'
import '../styles/cardDetail.scss'

import {ReactComponent as Heart} from '../images/heart.svg'
import {ReactComponent as Share} from '../images/share.svg'
import {ReactComponent as Github} from '../images/github.svg'
import {ReactComponent as Home} from '../images/home.svg'
import {ReactComponent as Mail} from '../images/mail.svg'
import {ReactComponent as Arrow} from '../images/arrow.svg'

import { showReleseDate } from '../lib/getPeriod'

const CardDetail = () => {
    const {id} = useParams()
    const [card,setCardDetail] = useState<ICard>();
    const navigate = useNavigate();
    const [commentForm, setCommentForm] = useState<boolean>(false);

    const regexContent = (data:string) => data.split(/(>|###|##|!\[\]|---)/g);
    const removeSpaceInWord = (arr:Array<string>) => arr.filter(Boolean) // 공백제거
    const makeObjectList = (arr:Array<string>) => {
        const newData = []
        for (let index = 0; index < arr.length; index+= 2) {
            const element = {
                tag : arr[index], 
                content : arr[index+1]
            };
            newData.push({...element});
        }
        return newData
    }
    const processsingCardContent = (...funs:any) => (rowData:string) => {
        return funs.reduce((acc:any, func:any) => func(acc), rowData)
    }
    const cardContent:any = processsingCardContent(regexContent,removeSpaceInWord,makeObjectList);

    const getImage = (str:string) => {
        const data = str.match( /\((.*?)\)/)
        return data ? data[1] : " "
    }
    const handleDisplayCommentForm = () => setCommentForm (curr => !curr)

    useEffect( ()=>{
        if(id) {
            (async () => {
                setCardDetail(await getCardDetail(id))
            })()
        }
    },[])
     
    return (<>
        { card && 
            <div className='cardDetail-container'>
                <aside></aside>
                <div className='cardDetail-container__center'>
                    <section className='cardDetail-container__center__intro-part'>
                        <h1>{card.title}</h1>
                        <div>
                            <h4>{card.user.username}</h4>
                            <h4>{`・ ${showReleseDate(card.released_at)}`}</h4>
                        </div>
                        <ul className='cardDetail-container__center__intro-part__tags'>
                            {card.tags.map(tag => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                        <div className='cardDetail-container__center__intro-part__simple-contents'>
                            <article className='cardDetail-container__center__intro-part__simple-contents__heart-share'>
                                <div><Heart /></div>
                                <div>{card.likes}</div>
                                <div><Share /></div>
                            </article>
                            <article>
                                <h2>Memo</h2>
                                <div>
                                    <h4>목록보기</h4>
                                </div>
                            </article>
                            <article>
                                <div />
                                <ul>
                                    {card.series?.series_posts.map(post =>(
                                        <li key={post.post.id}>{ post.post.url_slug}</li>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    </section>
                    <section className='cardDetail-container__center__content'>
                        <div>
                            {cardContent(card.body).map((item:any,i:number) => {
                                const htmlTag = 
                                    item.tag === '<' ? 
                                        (<div key={i}>
                                            <div/>
                                            <p>{item.content}</p>
                                        </div>)
                                    :item.tag === '###' ? <h1 key={i}>{item.content}</h1> 
                                    :item.tag === '##'  ? <h1 key={i}>{item.content}</h1> 
                                    :item.tag === '![]' ? <img key={i} src={getImage(item.content)}/> 
                                    :<div key={i}>{item.content}</div> 

                                return htmlTag
                            })}
                        </div>
                    </section>

                    <section className='cardDetail-container__center__userInfo'>
                        <article>
                            <div>
                                <img src={card.user.profile.thumbnail}/ >
                            </div>
                            <div>
                                <h3>{card.user.username}</h3>
                                <h3>{card.user.profile.short_bio}</h3>
                            </div>
                        </article>
                        <hr />
                        <article>
                            <div><Github /></div>
                            <div><Home /></div>
                            <div> <Mail/></div>
                        </article>
                    </section>

                    <section className='cardDetail-container__center__previousPost'>
                        {
                            card.linked_posts.previous && 
                                <article onClick={()=> navigate(`/card/${card.linked_posts.previous.id}`)}>
                                    <div><Arrow /></div>
                                    <div>
                                        <h5>이전 포스트</h5>
                                        <h4>{card.linked_posts.previous.title}</h4>
                                    </div>
                                </article>
                        }
                    </section>

                    <section  className='cardDetail-container__center__comment-form'>
                        <h3>
                            {card.comments_count > 0 ?
                                `${card.comments_count}개의 댓글`
                                : "댓글이 없습니다."
                            }
                        </h3>
                        <form>
                            <textarea placeholder='댓글을 작성하세요.'/>
                            <button>댓글 작성</button>
                        </form>
                    </section>

                    <section  className='cardDetail-container__center__comments'>
                        {card.comments.map( comment => (
                            <article key={comment.id}>
                                <div>
                                    <div>
                                        <img src={comment.user.profile.thumbnail}/>
                                    </div>
                                    <div>
                                        <h4>{comment.user.username}</h4>
                                        <p>{showReleseDate(comment.created_at)}</p>
                                    </div>
                                </div>
                                <p>{comment.text}</p>
                                <button onClick={handleDisplayCommentForm}>  
                                    {commentForm ? "- 숨기기" : "+ 답글 달기"}
                                </button>
                                <form style={{display: commentForm ? "block" : "none"}}>
                                    <textarea placeholder='댓글을 작성하세요.'/>
                                    <div> 
                                        <button>취소</button>
                                        <button>댓글 작성</button>
                                    </div>
                                </form>
                            </article>
                        ))}
                    </section>
                </div>
                <aside></aside>
            </div>
            
            }
        </>
    )
}


export default CardDetail