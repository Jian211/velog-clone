import React from 'react'
import '../styles/cardList.scss'
import Card from './Card'
import { useRecoilValue} from 'recoil'
import {cardListData} from '../store/atom'
import NoCardError from './NoCardError'

const CardList = () => {

    const cardList= useRecoilValue(cardListData);

    return (
        <section className='cardList-container'>
            {cardList
              ? cardList
                    .filter( card => card.thumbnail)
                    .map( card => (
                        <Card 
                            key={card.id}
                            {...card}
                        />
                    ))
            : <NoCardError />
            }
        </section>
    )
}

export default CardList