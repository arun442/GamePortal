import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Guessthecard.css';
import { useNavigate ,useLocation} from "react-router-dom";
import wallet from '../wallet.png'
import logout from '../exit.png';
import boy from '../avatarimg.png'
import Modal from 'react-bootstrap/Modal';
import questionmark from '../question-mark.png'
import rupee from '../rupee.png'

const Guessthecard = () => {
  const [rewardadd, setrewardadd] = useState(false);
  const [deckv1, setDeckv1] = useState([]);
  const [maxChances, setMaxChances] = useState(5);
  const [multiplier, setMultiplier] = useState(5);
  const [cardsClicked, setCardsClicked] = useState(0);
  const [wonGame, setWonGame] = useState(false);
  const [deckSize, setDeckSize] = useState(0);
  const [walletBal, setWalletBal] = useState(0);
  const [autoSelectedCard, setAutoSelectedCard] = useState({ value: '', suit: '' });
  const cards = ['ace', 'jack', 'queen', 'king'];
  const suits = ['club', 'diamond', 'heart', 'spade'];
  const user_id=localStorage.getItem('user_id');
  const user_name=localStorage.getItem('user_name');
  const navigate = useNavigate();
  const [slno,setslno]=useState('');
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  useEffect(()=>{
    console.log('callsuffel');
    showShuffledCards();
  },[])
  useEffect(() => {
    axios({
      url: `${window.baseUrl}user/${user_id}`,
      method: "get",
     
  })
      .then((res) => {
          console.log(res.data);
          if (res.data) {
          const walletbalance=res.data.walletBalance;
          
              setWalletBal(Number(walletbalance).toFixed(2));
          }else{
              setWalletBal(localStorage.getItem('walletBalance'))
          }
      })    
  }, []);

  const showShuffledCards = () => {
    
    let newDeckv1 = [];
    console.log(newDeckv1);
    setMaxChances(5);
    setMultiplier(5);
    setCardsClicked(0);
    setWonGame(false);
    let size = 0;
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < cards.length; x++) {
        let card = { Value: cards[x], Suit: suits[i] };
        newDeckv1.push(card);
        size++;
      }
    }
    // Shuffle the cards
    for (let i = newDeckv1.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = newDeckv1[i];
      newDeckv1[i] = newDeckv1[j];
      newDeckv1[j] = temp;
    }
    setDeckv1(newDeckv1);
    setDeckSize(size);
    for (let i = newDeckv1.length - 1,j=0; i >= 0; i--,j++) {
        console.log("i -> "+i+"-> "+newDeckv1[i].Value+" "+newDeckv1[i].Suit,newDeckv1.length);
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.style.backgroundImage = `url(${require(`./images/back_of_card.png`)})`;//`url('images/${deckv1[i].Value}_of_${deckv1[i].Suit}s.png')`;
                cardDiv.dataset.value = newDeckv1[i].Value;
                cardDiv.dataset.suit = newDeckv1[i].Suit;
                cardDiv.id=j;
                console.log(document.getElementById("deck"));
                document.getElementById("deck").append(cardDiv)
                // if(i===3) debugger;
                // newDeckv1.push(cardDiv)
                // deck.append(cardDiv)
            
        }
  };

  const drawRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * deckv1.length);
    const randomCard = deckv1[randomIndex];
    console.log(randomCard.Value+"_of_"+randomCard.Suit);
    setAutoSelectedCard({ value: randomCard.Value, suit: randomCard.Suit });
    document.getElementById('autoCardDrawn').style.backgroundImage= `url(${require(`./images/${randomCard.Value}_of_${randomCard.Suit}s.png`)})`;
    return randomCard;
  };

  const handleDrawBtnClick = async() => {
    // if (walletBal-betAmount<=0) {
    //     alert('Insufficient Balance');
    //     return; 
    // }

   
    const betAmount = parseInt(document.getElementById('bet').value);
    document.getElementById('curMultiplier').value = multiplier;
    if ((betAmount <= 0 || isNaN(betAmount)) || betAmount > walletBal) {
      alert('Please enter a valid bet amount.');
      return;
    }else{
        const list = document.getElementById("deck");

        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
            showShuffledCards();
                let data = JSON.stringify({
                    "walletBalance" : walletBal,
                    "betAmount" : betAmount,
                    "gameId":2
                  });
                try {
                    const accessToken = localStorage.getItem('token');
                    //const accessToken = GetCookie('usrin');
                    if (accessToken) {
                      const myHeaders = {
                 headers: {
                           'Content-Type': 'application/json',
                          'Authorization': `Bearer ${accessToken}`
                }
                };
                    const res =await axios.post(`${window.baseUrl}store`, data, myHeaders);
                    if(res.status === 200){
               setslno(res.data.slno)
                        const calcbalance=(walletBal-betAmount).toFixed(2)
                        console.log(Number(calcbalance));
                        setWalletBal(Number(res.data.newWalBal).toFixed(2) )
              }
                    } else {
                }
                  } catch (err) {
                 }
               
        
        
  
        
            
        const autoSelectedCard = drawRandomCard();
        document.getElementById('result').innerHTML = `Auto Selected Card: ${autoSelectedCard.Value} of ${autoSelectedCard.Suit}s<br>`;
    }
   
  };
 
  const handleDeckClick = async(event) => {
    const betAmount = parseInt(document.getElementById('bet').value);
    
    if (betAmount <= 0 || isNaN(betAmount)) {
      alert('Please enter a valid bet amount.');
      return;
    }
   
    if (autoSelectedCard.value === "") {
      alert('Please enter a valid bet amount and click on Draw card to start game');
      return;
    }
    if (cardsClicked < maxChances && !wonGame) {
      const selectedCard = event.target;
      if (!selectedCard.classList.contains('clicked') && !(wonGame)) {
        setCardsClicked(cardsClicked + 1);
        const selectedCategory = autoSelectedCard.suit;
        const selectedCardValue = autoSelectedCard.value;
        selectedCard.classList.add('clicked');
        selectedCard.style.backgroundImage = `url(${require(`./images/${deckv1[(deckSize - 1) - selectedCard.id].Value}_of_${deckv1[(deckSize - 1) - selectedCard.id].Suit}s.png`)})`;
        setTimeout(1000);
        if (selectedCategory === selectedCard.dataset.suit && selectedCardValue === selectedCard.dataset.value) {
          const betAmount = parseInt(document.getElementById('bet').value);
          const winnings = betAmount * multiplier;
          selectedCard.style.border="thick solid rgb(189 255 0)";
          alert(`Congratulations! You won ${winnings}.`);
          setrewardadd(true)
            let data = JSON.stringify({
                "multiplier": Number(multiplier),
                 "result": "win"
              });
            try {
                const config = {
                    headers : {'Content-Type' :  'application/json',
                    'Access-Control-Allow-Origin' : 'true'},
                }  
                //const accessToken = GetCookie('usrin');             
                const res =await axios.post(`${window.baseUrl}update/${slno}`, data,config);
                if(res.status === 200){
            setTimeout(() => {
              setrewardadd(false);
            }, 1500);
                    setWalletBal(Number(res.data.newWalBal).toFixed(2))
                }
              } catch (err) {
             }
          
        
          setWonGame(true);
          revealAll();
        } else {
            setCardsClicked(cardsClicked + 1);
          setMultiplier(multiplier / 2);
          document.getElementById('curMultiplier').value = multiplier;
          alert(`You missed😌.`);
        }
      }
    } else {
      if (wonGame){
        alert("You have already Won the game. Please restart");
      } 
      else {
        alert("You have reached maximum number of Attempts!");
      revealAll();
      }
    }
  };

  const revealAll = () => {
    //const autoSelectedCard = document.getElementById('autoCardDrawn');
		const autoSelectedCategory = autoSelectedCard.suit;// autoSelectedCard.dataset.suit;
		const autoSelectedCardValue = autoSelectedCard.value;   
    for (var i = 0; i < deckSize; i++) {
      const selectedCard = document.getElementById(i);
      if (!selectedCard.classList.contains('clicked')) {
        selectedCard.classList.add('clicked');
        selectedCard.style.backgroundImage = `url(${require(`./images/${deckv1[(deckSize - 1) - selectedCard.id].Value}_of_${deckv1[(deckSize - 1) - selectedCard.id].Suit}s.png`)})`;
      }
      if (autoSelectedCategory === selectedCard.dataset.suit && autoSelectedCardValue === selectedCard.dataset.value) {
        selectedCard.style.border="thick solid rgb(189 255 0)";
    }
    }
  };
  const goback=()=>{
    navigate('/allgames')
}
  return (
    <div className="container3">
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton style={{backgroundColor:'aliceblue',fontFamily:'poppins'}}>
          <Modal.Title>How to Play<img src={questionmark} style={{height:'40px'}} />
</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'aliceblue',fontFamily:'poppins'}}>
          <ol><li>Enter the bet amount</li>
          <li>Click on <b>Draw Card</b> button to draw a random card</li>
          <li>You have five chance to guess the "Drawn Card" in the set </li>
          <li>Lesser the chances utilized, the more you win</li>

</ol>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'aliceblue',fontFamily:'poppins'}} >
          <button className="btn3" variant="primary" onClick={handleClose}>Understood</button>
        </Modal.Footer >
      </Modal>
      
            <div className='row' style={{backgroundColor:'#FFC94A',color:'white',height:'12vh',display:'flex',justifyContent:'center',border:'2px solid whitesmoke',width:'100%',margin:0}}>
<div className='col col-md-4' style={{textAlign:'start',padding:'10px',height:'100%',fontFamily:'poppins',fontWeight:'bolder'}}>
<img src={boy} style={{height:'50px',cursor:'pointer'}} />&nbsp;&nbsp;&nbsp;&nbsp;
    {user_name}
</div>
<div className='col col-md-8' style={{display:'flex',justifyContent:'end',padding:'10px',height:'100%',gap:'50px'}}>
<h2 style={{fontWeight:'bolder'}}><img src={wallet} style={{height:'50px'}}/>&nbsp;&nbsp;{walletBal}</h2><img src={logout} style={{height:'50px',cursor:'pointer'}} onClick={goback}/>

        </div>
            </div>
      <div className="row" style={{width:'100%',marginTop:'5px'}}>
        <div className="col-3">
          <div className="row">
            <div className="options col-12">
              <div className="row">
                <div className="col-6"><label htmlFor="bet">Bet Amount:</label></div>
                <div className="col-5"><input type="text" id="bet" name="bet" min="50" step="1" onKeyDown={(e) => {
            // Allow: backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        }} /></div>
              </div>
             
              <div className="row">
                <div className="col-6"><label htmlFor="curMultiplier">Current Multiplier:</label></div>
                <div className="col-5"><input type="number" id="curMultiplier" name="curMultiplier" readOnly value={multiplier} /></div>
              </div>
              <div className="row">
                <div className="col-11"><button id="drawBtn" className="btn2" onClick={handleDrawBtnClick} style={{margin:'10px'}}>Draw Card</button></div>
              </div>
              <div className="row">
                <div id="result" className="col-11"></div>
              </div>
            </div>
            <div className="col-12">
              <div id="autoCardDrawn" className="card" data-value="" data-suit="" style={{}}></div>
            </div>
          </div>
        </div>
        <div className="col-9 deck-overflow">
          <div className="deck" id="deck" onClick={handleDeckClick}>
            {/* {deckv1.map((card, index) => (
              <div key={index} className="card" id={index}></div>
            ))} */}
          </div>
        </div>
      </div>
      {rewardadd? <div className='winningrewardg2'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningrewardg21'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningrewardg22'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
    </div>
  );
};

export default Guessthecard;
