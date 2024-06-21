import React, { useEffect, useState } from "react";
import cardgb1 from "../cardgb1.png";
import CardFlip from "react-card-flip";
import "./cards.css";
import logout from '../../exit.png';
import wallet from '../../wallet.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import questionmark from '../../question-mark.png'
import { useNavigate ,useLocation} from "react-router-dom";
import axios from 'axios';
import rupee from '../../rupee.png'

const HighorLow = () => {
  const containerStyle = {
    backgroundImage: `url(${cardgb1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
  };

  const [rewardadd, setrewardadd] = useState(false);

  const navigate = useNavigate();
  const [slno,setslno]=useState('');
  const user_id=localStorage.getItem('user_id');
  const [balance, setBalance] = useState(100);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [cardvisible,setcardvisible]=useState(false);
    const [betAmount, setBetAmount] = useState("");
  const [gameStarted, setGameStarted] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardNumber, setSelectedCardNumber] = useState(null); 

let betType=''
  const [gameResult, setGameResult] = useState("");
  useEffect(()=>{
handleClick();
  },[betType])
  useEffect(() => {
    axios({
      url: `${window.baseUrl}user/${user_id}`,
      method: "get",
     
  })
      .then((res) => {
          console.log(res.data);
          if (res.data) {
          const walletbalance=res.data.walletBalance;
          
              setBalance(Number(walletbalance).toFixed(2));
          }else{
              setBalance(localStorage.getItem('walletBalance'))
          }
      })     

}, []);
  const handleStartGame = async() => {
    if (parseInt(betAmount) > 0) {
      if (balance>=parseInt(betAmount)) {
        let data = JSON.stringify({
          "walletBalance" : balance,
          "betAmount" : betAmount,
          "gameId":3
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
              setBalance(Number(res.data.newWalBal).toFixed(2) )
    }
          } else {
      }
        } catch (err) {
       }
        setGameStarted(true);
setcardvisible(true);
      const suits = ["clubs", "spades", "hearts", "diamonds"];
      const randomIndex = Math.floor(Math.random() * 52);
      const cardNumber = Math.floor(Math.random() * 3) + 7;

      // let cardNumber;
      // switch (randomIndex % 13) {
      //   case 0:
      //     cardNumber = "ace";
      //     break;
      //   case 10:
      //     cardNumber = "jack";
      //     break;
      //   case 11:
      //     cardNumber = "queen";
      //     break;
      //   case 12:
      //     cardNumber = "king";
      //     break;
      //   default:
      //     cardNumber = (randomIndex % 13) + 1;
      //     break;
      // }

      const randomSuit = suits[Math.floor(randomIndex / 13)];

      setSelectedCard(require(`../images/${cardNumber}_of_${randomSuit}.png`));
      setSelectedCardNumber(cardNumber);
      }else{
        alert("Insufficient balance");
      }
      
    } else {
      alert("Invalid Bet Amount");
    }
  };

  const handleHighBet = () => {
betType="HIGH" ;
   console.log(betType);
    handleClick();
  };

  const handleLowBet = () => {

    betType="LOW" ;
    console.log(betType);

    handleClick();
  };

  const handleClick =async() => {
    // const cardNumber = Math.floor(Math.random() * 3) + 7;

    if (!gameStarted) {
      return;
    }
    
  
    const suits = ["clubs", "spades", "hearts", "diamonds"];
    const randomIndex = Math.floor(Math.random() * 52);
  
    let cardNumber;
    switch (randomIndex % 13) {
      case 0:
        cardNumber = "ace";
        break;
      case 10:
        cardNumber = "jack";
        break;
      case 11:
        cardNumber = "queen";
        break;
      case 12:
        cardNumber = "king";
        break;
      default:
        cardNumber = (randomIndex % 13) + 1;
        break;
    }

    const randomSuit = suits[Math.floor(randomIndex / 13)];

    setSelectedCard(require(`../images/${cardNumber}_of_${randomSuit}.png`));
    setSelectedCardNumber(cardNumber);
  
    console.log("Card Number:", cardNumber);
    
    console.log("Selected Card Number:", selectedCardNumber);
    let setvalue=selectedCardNumber;
  switch(selectedCardNumber){
    case 'ace':
          setvalue=1;
          break;
          case 'queen':
            setvalue=12;
            break;
            case 'jack':
            setvalue=11;
            break;
            case 'king':
            setvalue=13;
            break;
            default:
                setvalue=selectedCardNumber;
                break;
  }


  let newCardValue=cardNumber;
  switch(newCardValue){
    case 'ace':
        newCardValue=1;
          break;
          case 'queen':
            newCardValue=12;
            break;
            case 'jack':
                newCardValue=11;
            break;
            case 'king':
                newCardValue=13;
            break;
            default:
                newCardValue=cardNumber;
                break;
  }
  // if (newCardValue === setvalue) {setGameStarted(false);setBetAmount("");setGameResult("");return;}
    let result;
    if ((betType === "HIGH" && newCardValue > setvalue) || (betType === "LOW" && newCardValue < setvalue)) {
      console.log("Winning Bet Type:", betType);
      result = "WIN";
      setrewardadd(true)

      let data = JSON.stringify({
        "multiplier": 2,
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
      setrewardadd(false)

    }, 1500);
            setBalance(Number(res.data.newWalBal).toFixed(2))
        }
      } catch (err) {
     }
        setGameStarted(false)
    } else {
      console.log("Losing Bet Type:", betType);
      result = "LOSS";
        setGameStarted(false)
        }
  
    console.log("Result:", result);
    setGameResult(result);
 
  };
  
  const goback=()=>{
    navigate('/allgames')

   }
  return (
    
    <div className="container-fluid" style={containerStyle}>
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
        1.Place the bet amount to start the game.<br/>
		2.A reference card is drawn for you to guess the next card.<br/>
3.Guess the next card if it is High or Low.<br/>
4.If the guess is correct, then player wins double the bet amount and the game ends.<br/>
5.If the guess is wrong, player lose and the game ends.<br/> 
<b>Additional Rules:</b><br/>
	Ace,2,3....,King
    Aces are considered the lowest card<br/>
    If the next card is the same as the reference card, it's considered a loss for the player.<br/>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'aliceblue',fontFamily:'poppins'}} >
          <button className="btn3" variant="primary" onClick={handleClose}>Understood</button>
        </Modal.Footer >
      </Modal>
      <div className="row">
        <div className="col col-8" style={{textAlign:'end'}}>
          <span
            style={{
              color: "goldenrod",
              fontSize: "50px",
              fontWeight: "bolder",
              textShadow:
                "0 0 5px white, 0 0 10px white, 0 0 20px white, 0 0 40px goldenrod, 0 0 70px goldenrod, 0 0 80px goldenrod, 0 0 100px goldenrod, 0 0 150px goldenrod",
            }}
          >
            HIGH LOW
          </span>
        </div>
        <div className="col col-4" style={{justifyContent:'end',display:'flex',color:'goldenrod',gap:'10px',alignItems:'center'}}>
        <img src={wallet} style={{height:'50px'}}/><h2 style={{fontWeight:'bolder'}}>{balance}</h2>                    
        <img src={logout} style={{height:'50px',cursor:'pointer'}} onClick={goback}/>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-4">
          {true && (
            <>
              <div className="row" style={{ marginTop: "110px" }}>
                <div className="col">
                  <span
                    style={{
                      color: "white",
                      fontSize: "40px",
                      fontWeight: "bolder",
                      textShadow:
                        "0 0 10px goldenrod, 0 0 20px  goldenrod, 0 0 30px  goldenrod, 0 0 40px white, 0 0 70px white, 0 0 80px white, 0 0 100px white, 0 0 150px white",
                    }}
                  >
                    Enter Bet Amount
                  </span>
                </div>
              </div>
              <div className="row" style={{ marginTop: "25px" }}>
                <div className="col">
                  <input
                    type="text"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    style={{
                      width: "23vw",
                      borderColor: "goldenrod",
                      height: "6vh",
                    }}
                    onKeyDown={(e) => {
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
                  }}
                  ></input>
                </div>
              </div>
              <div className="row" style={{ marginTop: "26px" }}>
                <div className="col">
                  <button
                    type="button"
                    className="btn3"
                    style={{
                      color: "goldenrod",
                      fontSize: "25px",
                      fontWeight: "bolder",
                      borderColor: "goldenrod",
                      backgroundColor: "white",
                    }}
                    onClick={handleStartGame}
                  >
                    start game
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col mt-5">
            <>
            {cardvisible?
              <div className="row" style={{display:'grid',justifyContent:'center'}}>
                <CardFlip isFlipped={gameResult!==""} flipDirection="vertical">
                  <div
                    className="card1"
                    style={{
                      width: "20vw",
                      height: "55vh",
                      backgroundColor: "goldenrod",
                    }}
                  >
                    <img
                      src={selectedCard}
                      style={{
                        width: "65%",
                        height: "100%",
                        boxShadow:
                          "0 0 5px goldenrod, 0 0 10px  goldenrod, 0 0 15px  goldenrod, 0 0 20px white, 0 0 35px white, 0 0 40px white, 0 0 50px white, 0 0 50px white",
                      }}
                    />
                  </div>
                  <div
                    className="card1"
                    style={{
                      width: "20vw",
                      height: "55vh",
                      backgroundColor: "goldenrod",
                    }}
                  >
                    <img
                      src={selectedCard}
                      style={{
                        width: "65%",
                        height: "100%",
                        boxShadow:
                          "0 0 5px goldenrod, 0 0 10px  goldenrod, 0 0 15px  goldenrod, 0 0 20px white, 0 0 35px white, 0 0 40px white, 0 0 50px white, 0 0 50px white",
                      }}
                    />
                  </div>
                </CardFlip>
              </div>:null}
              {gameStarted && (

              <div className="row mt-3" style={{gap:'20px'}}>
                <div className="col col-md-5" style={{textAlign:'end'}}> 
                  <button
                    type="button"
                    className="btn3 btn-primary"
                    onClick={handleHighBet}
                    style={{
                                              color: "goldenrod",
                                              fontSize: "25px",
                                              fontWeight: "bolder",
                                              borderColor: "goldenrod",
                                              backgroundColor: "white",
                                            }}
                  >
                    High
                  </button></div>
                  <div className="col col-md-5" >
                  <button
                    type="button"
                    className="btn3 btn-danger"
                    onClick={handleLowBet}
                    style={{
                        color: "goldenrod",
                        fontSize: "25px",
                        fontWeight: "bolder",
                        borderColor: "goldenrod",
                        backgroundColor: "white",
                      }}
                  >
                    Low
                  </button>
                </div>
              </div> )}
            </>
         
        </div>
        <div className="col col-md-3">
          <div className="row">
                  <span
                    style={{
                      color: "white",
                      fontSize: "30px",
                      fontWeight: "bolder",
                      textShadow:
                      "0 0 10px goldenrod, 0 0 20px  goldenrod, 0 0 30px  goldenrod, 0 0 40px white, 0 0 70px white, 0 0 80px white, 0 0 100px white, 0 0 150px white",
                    }}
                  >
                    {gameResult && `Result: ${gameResult}`}
                    
                  </span>
                  </div>  
                  <div className="row">
                
                  </div>  
        </div>
      </div>
      {rewardadd? <div className='winningrewardg3'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningrewardg31'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningrewardg32'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
    </div>
  );
};

export default HighorLow;
