import React from 'react'
import '../styles/cardList.scss'
import Card from './Card'
import {useRecoilState} from 'recoil'
import {cardListData} from '../store/atom'

const CardList = () => {

    const [cardList, setCardList] = useRecoilState(cardListData);

    return (
        <section className='cardList-container'>
            {cardList ? 
                cardList.list
                    .filter( card => card.thumbnail)
                    .map( card => (
                        <Card 
                            key={card.id}
                            {...card}
                        />
                    ))
            : "없스빈다."
            }
        </section>
    )
}

export default CardList