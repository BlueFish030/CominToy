import { render } from '@testing-library/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import SingleCard from './SingleCard'

export default function Card() {
    //紀錄剩餘卡組
    const [cards,setCards] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,
                                       1,2,3,4,5,6,7,8,9,10,11,12,13,
                                       1,2,3,4,5,6,7,8,9,10,11,12,13,
                                       1,2,3,4,5,6,7,8,9,10,11,12,13])

    //紀錄抽出的卡
    const [pick,setPick] = useState()

    //紀錄桌面牌數
    const [deskCard,setDeskCard] = useState(0)

    //獲取當前玩家
    const [p1,setP1] = useState(true)

    //玩家手牌數目
    const [p1Card,setP1Card] = useState(26)
    const [p2Card,setP2Card] = useState(26)

    //計數器
    const [counter,setCounter] = useState(-2)

    const handleSlap = (event)=>{
        const p1Hand = document.getElementById('p1Hand')
        const p2Hand = document.getElementById('p2Hand')
        if(event.code=='KeyW'){
            console.log('P1 woooooooooooow')
            alert('P1 slap you up')
            for(let i=0;i<deskCard;i++){  
                const outCard = document.createElement('div')
                const innerCard = document.createElement('div')
                outCard.className = 'cardBack'
                innerCard.className = 'cardBackInner'
                outCard.append(innerCard)             
                p2Hand.append(outCard)
                console.log(i,deskCard)
            }
            window.removeEventListener('keydown', handleSlap)
            setP2Card(prev => prev + deskCard)
            setDeskCard(0)
            document.getElementById("p2").disabled = false;
        }else if(event.code=='ArrowUp'){
            console.log('P2 woooooooooooow')
            alert('P2 slap you up')
            for(let i=0;i<deskCard;i++){
                const outCard = document.createElement('div')
                const innerCard = document.createElement('div')
                outCard.className = 'cardBack'
                innerCard.className = 'cardBackInner'
                outCard.append(innerCard) 
                p1Hand.append(outCard)
                console.log(i,deskCard)
            }
            window.removeEventListener('keydown', handleSlap)
            setP1Card(prev => prev + deskCard)
            setDeskCard(0)
            document.getElementById("p1").disabled = false;
        }

    }

    useEffect(()=>{
        setCounter(prev => prev + 1);
        console.log('counter:'+counter,'pick:'+pick);
        if((counter+1)==pick||(counter==13&&pick==1)){
            console.log('slap')
            document.getElementById("p1").disabled = true;
            document.getElementById("p2").disabled = true;
            window.addEventListener('keydown', handleSlap)
        }
        if(counter==13){
            setCounter(1);
        }
        if(cards.length==0){
            setCards([1,2,3,4,5,6,7,8,9,10,11,12,13,
                      1,2,3,4,5,6,7,8,9,10,11,12,13,
                      1,2,3,4,5,6,7,8,9,10,11,12,13,
                      1,2,3,4,5,6,7,8,9,10,11,12,13])
        }

        //使用useEffect顯示正確數據
        console.log("p1 card:"+p1Card)
        console.log("p2 card:"+p2Card)
        console.log('desk:'+deskCard)
        if(p1Card==0){
            alert('P1 win!!!')
        }else if(p2Card==0){
            alert('P2 win!!!')
        }
        console.log(cards.length)
        console.log("--------------------")
    },[deskCard])

    //點擊抽卡
    const handleClick =(e)=>{
        const p1Hand = document.getElementById('p1Hand')
        const p2Hand = document.getElementById('p2Hand')
        
        //在卡池隨機抽一張卡，記作pickNum
        let pickNum = cards[Math.floor(Math.random()*cards.length)]

        //將pickNum賦予pick
        setPick(pickNum)
        
        //對應玩家手牌-1
        if(e.target.id=='p1'){
            setP1Card(prev => prev - 1)
            p1Hand.removeChild(p1Hand.childNodes[0]);
            document.getElementById("p1").disabled = true;
            document.getElementById("p2").disabled = false;
        }else if(e.target.id=='p2'){
            setP2Card(prev => prev - 1)
            p2Hand.removeChild(p2Hand.childNodes[0]);
            document.getElementById("p2").disabled = true;
            document.getElementById("p1").disabled = false;
        }

        //桌面牌數+1
        setDeskCard(prev => prev + 1)

        //將pickNum從卡組剔除
        for(let i=0; i<cards.length;i++){
            if(cards[i]==pickNum){
                cards.splice(i,1);
                break;
            }
        }
        // console.log(cards)
        // console.log(e.target.id)
    }

  return (
        <div className='gameDesk'>
            {/* <p>P1: {p1Card} left</p>
            <button id='p1' onClick={handleClick}>pick a card</button>
            <p>card: {pick}</p>
            <p>{counter}</p>
            <button id='p2' onClick={handleClick}>pick a card</button>
            <p>P2: {p2Card} left</p> */}
            <div className='p1' id='p1Hand'>
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
            </div>
            <h1 style={{position:'fixed',zIndex:'-1',top:'20px',left:'20%',color:'rgba(155, 93, 229, 1)'}}>{p1Card} cards</h1>
            
            <div className='middle'>
                <div className='pickCard'><p style={{color:'white',paddingBottom:'130px',paddingLeft:'20px'}}>Picked:</p><h1 style={{color:'white',fontSize:'3rem',paddingTop:'120px',paddingRight:'20px'}}>{pick}</h1></div>
                <div className='counterNum'><p style={{color:'rgb(0, 24, 48)',paddingBottom:'130px',paddingLeft:'20px'}}>Counter:</p><h1 style={{color:'rgb(9, 40, 71)',fontSize:'3rem',paddingTop:'120px',paddingRight:'20px'}}>{counter}</h1></div>
                <button id='p1' className='drawBtn' onClick={handleClick}>P1 pick a card</button>
                <button id='p2' className='drawBtn' onClick={handleClick}>P2 pick a card</button>
            </div>
            <div id='desk' style={{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:'-1',width:'auto',height:'auto',color:'rgb(241, 91, 181)'}}><p style={{padding:'15px',fontSize:'1.5rem',borderRadius:'15px',border:'5px double rgb(9, 40, 71)'}}>{deskCard} Cards on desk</p></div>
            <h1 style={{position:'fixed',zIndex:'-1',top:'20px',right:'20%',color:'rgba(155, 93, 229, 1)'}}>{p2Card} cards</h1>
            
            <div className='p2' id='p2Hand'>
            <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
                <SingleCard />
            </div>
        </div>
  )
}
