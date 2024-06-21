import React, { useState,useEffect } from 'react';
import '../BombvsGem/BombvsGem.css';
import axios from 'axios';
import diamondgif from '../../diamond95px.gif'
import bombgif from '../../bomb95px.gif'
import logout from '../../exit.png';
import { useNavigate ,useLocation} from "react-router-dom";
import coins from '../../coin.png'
import wallet from '../../wallet.png'

import Modal from 'react-bootstrap/Modal';
import questionmark from '../../question-mark.png'
import blast from '../../4hsr-ezgif.com-resize.gif'
import rupee from '../../rupee.png'

const BombvsGem = () => {
  // Define states
  const navigate = useNavigate();
  const [rewardadd, setrewardadd] = useState(false);

  const [walletAmount, setWalletAmount] = useState(0);
  const [multiplier,setMultiplier]=useState(1.2);
  const [squares, setSquares] = useState([]);
  const [addMoneyPopupVisible, setAddMoneyPopupVisible] = useState(false);
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [gamestarted,setgamestarted]=useState(false);
  const user_id=localStorage.getItem('user_id');
  const [slno,setslno]=useState('');
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  useEffect(() => {
    generateGameGrid();
  }, []);
  useEffect(() => {
    axios({
      url: `${window.baseUrl}user/${user_id}`,
      method: "get",
     
  })
      .then((res) => {
          console.log(res.data);
          if (res.data) {
          const walletbalance=res.data.walletBalance;
          
              setWalletAmount(Number(walletbalance).toFixed(2));
          }else{
              setWalletAmount(localStorage.getItem('walletBalance'))
          }
      })     

}, []);
  const generateGameGrid = () => {
    const newSquares = [];
    for (let i = 0; i < 25; i++) {
      newSquares.push({
        index: i,
        revealed: false,
        isBomb: false,
      });
    }
    setSquares(newSquares);
  };
 
  const initializeGame = async() => {
    console.log(squares);
    const betAmount = parseFloat(document.getElementById('bet-amount').value);
    const numBombs = parseInt(document.getElementById('num-bombs').value);
    console.log(isNaN(betAmount));
    console.log(walletAmount>betAmount)
    if (isNaN(betAmount)) {
      alert('Bet amount exceeds wallet amount!');
      return;
    }else if(walletAmount<betAmount||betAmount<=0){
        alert('Bet amount exceeds wallet amount!');
        return;
    }else if(isNaN(numBombs)){
        alert('enter the Bomb count');
        return;
    }else if(numBombs<5||numBombs>25){
        alert('bomb count is invalid');
        return;
    }
    let data = JSON.stringify({
      "walletBalance" : walletAmount,
      "betAmount" : betAmount,
      "gameId":4
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
          setWalletAmount(Number(res.data.newWalBal).toFixed(2) )
}
      } else {
  }
    } catch (err) {
   }
    setgamestarted(true);
    console.log(betAmount>0);
    setCurrentEarnings(betAmount);
    const bombPositions = generateBombPositions(numBombs);
    const diamondPositions = generateDiamondPositions(bombPositions.length);
    console.log(bombPositions);
    console.log(diamondPositions)
    setSquares((prevSquares) =>
      prevSquares.map((square, index) => ({
        ...square,
        isBomb: bombPositions.includes(index),
        isDiamond:true
      }))
    );
  };
 
  const generateBombPositions = (numBombs) => {
    const positions = Array.from({ length: 25 }, (_, i) => i);
    return shuffle(positions).slice(0, numBombs);
  };
 
  const generateDiamondPositions = (numDiamonds) => {
    const positions = Array.from({ length: 25 }, (_, i) => i);
    const remainingPositions = positions.filter((pos) => !squares[pos].isBomb);
    return shuffle(remainingPositions).slice(0, numDiamonds);
  };
 
  const revealSquare = (index) => {
    if (squares[index].revealed||!gamestarted) return;
    setSquares((prevSquares) =>
      prevSquares.map((square, i) =>
        i === index ? { ...square, revealed: true } : square
      )
    );
    console.log(squares[index]);
    console.log(squares);

    if (squares[index].isBomb) {
      setSquares((prevSquares) =>
        prevSquares.map((square, i) =>
          i === index ? { ...square, revealed: true } : square
        )
      );
        revealAllSquares();
      setCurrentEarnings(0);
    } else if (squares[index].isDiamond) {
      const numBombs = parseInt(document.getElementById('num-bombs').value);
        console.log(currentEarnings);
        switch (numBombs) {
          case 5:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.2);
            break;
          case 6:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.3);
            break;
            case 7:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.4);
            break;
            case 8:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.5);
            break;
            case 9:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.6);
            break;
            case 10:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.7);
            break;
            case 11:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.8);
            break;
            case 12:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.9);
            break;
            case 13:
            setCurrentEarnings((prevEarnings) => prevEarnings * 2);
            break;
            case 14:
            setCurrentEarnings((prevEarnings) => prevEarnings * 2.3);
            break;
            case 15:
            setCurrentEarnings((prevEarnings) => prevEarnings * 2.5);
            break;
        
          default:
            setCurrentEarnings((prevEarnings) => prevEarnings * 1.2);
            break;
        }
      //   if (numBombs>=7&&numBombs<=10) {
      //     setCurrentEarnings((prevEarnings) => prevEarnings * 1.4);
      //   }
      //   else if(numBombs>10){
      //     setCurrentEarnings((prevEarnings) => prevEarnings * 1.5);

      //   }else{
      // setCurrentEarnings((prevEarnings) => prevEarnings * 1.2);
      //   }
    }
  };
 const changemultiplier=(e)=>{
  const bomb=Number(e.target.value);
  switch (bomb) {
    case 5:
      setMultiplier(1.2);
      break;
    case 6:
      setMultiplier(1.3);
      break;
      case 7:
        setMultiplier(1.4);
      break;
      case 8:
        setMultiplier(1.5);
      break;
      case 9:
        setMultiplier(1.6);
      break;
      case 10:
        setMultiplier(1.7);
      break;
      case 11:
        setMultiplier(1.8);
      break;
      case 12:
        setMultiplier(1.9);
      break;
      case 13:
        setMultiplier(2);
      break;
      case 14:
        setMultiplier(2.3);
      break;
      case 15:
        setMultiplier(2.5);
      break;
  
    default:
      setCurrentEarnings((prevEarnings) => prevEarnings * 1.2);
      break;
  }
 }
  const revealAllSquares = () => {
document.getElementById('bet-amount').value=0;
    document.getElementById('num-bombs').value=0;
    setgamestarted(false);
    setSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.isBomb ? { ...square, revealed: true } : { ...square, revealed: true }
      )
    );
    setTimeout(() => {
        setSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.isBomb ? { ...square, revealed: false } : { ...square, revealed: false }
      )
    );
    console.log(squares);

    }, 3000);
    console.log(squares);
  };
 
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
 
 
 

 
  const cashOut = async() => {
  //   let data = JSON.stringify({
  //     "multiplier": 2,
  //      "result": "win"
  //   });
  // try {
  //     const config = {
  //         headers : {'Content-Type' :  'application/json',
  //         'Access-Control-Allow-Origin' : 'true'},
  //     }  
  //     //const accessToken = GetCookie('usrin');             
  //     const res =await axios.post(`${window.baseUrl}update/${user_id}/3`, data,config);
  //     if(res.status === 200){
  
  //         setBalance(Number(res.data.newWalBal).toFixed(2))
  //     }
  //   } catch (err) {
  //  }
  setrewardadd(true)
  let data = JSON.stringify({
    "result": "win",
     "winningAmount": currentEarnings.toFixed(2)
     });
  try {
    const config = {
        headers : {'Content-Type' :  'application/json',
        'Access-Control-Allow-Origin' : 'true'},
    }  
    //const accessToken = GetCookie('usrin');             
    const res =await axios.post(`${window.baseUrl}update/winningAmount/${slno}`, data,config);
    if(res.status === 200){
      setTimeout(() => {
        setrewardadd(false)
  
      }, 1500);
        setWalletAmount(Number(res.data.newWalBal).toFixed(2))
    }
  } catch (err) {
 }
    setCurrentEarnings(0);
  revealAllSquares();
  };
  const goback=()=>{
    navigate('/allgames')

   }
 
  return (
  <>
    <div className="container2 row">
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
        The more diamonds found, the more you win.<br/>
You have chance to cashout your winning amount everytime you choose a diamond.<br/>
If you burst out a bomb you loose all the amount you win.<br/>
<b>instructions:</b><br/>
1)Enter the bet amount and number of bombs.<br/>
2)The more no. of bombs chosen, the high the multiplier will be<br/>
3)begin the game and start guessing the chest containing daimond<br/>
4)If the opened chest contains a diamond, the bet amount will be multiplied with the multiplier and player can choose to continue or cashout everytime a diamond is opened.<br/>
5)If cashed out or a bomb is blasted, the player looses the bet amount and the round ends<br/> 
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'aliceblue',fontFamily:'poppins'}} >
          <button className="btn3" variant="primary" onClick={handleClose}>Understood</button>
        </Modal.Footer >
      </Modal>
   
      <div className='row' style={{width:'100vw',padding:0,margin:0,display:'flex'}}>
      {/* <div className="input-container1 col-2" style={{display:'flex',alignItems:'center',color:'white'}}>
          <label htmlFor="wallet-amount">Wallet:</label>
          <span id="wallet-amount" style={{color: 'white'}} >{walletAmount}</span>
          <img src={wallet} style={{height:'30px'}}/>
        </div>   */}
      <h1 className="col-8 titletext" style={{textAlign:'end'}}>Find The Treasure </h1>
      <div className='col-4' style={{display:'flex',alignItems:'center',justifyContent:'end',gap:'20px'}}>
      <img src={wallet} style={{height:'40px'}}/><h2 style={{fontWeight:'bolder', textShadow:
                        "0 0 10px blue, 0 0 20px  black, 0 0 30px  black, 0 0 40px white, 0 0 70px white, 0 0 80px white, 0 0 100px white, 0 0 150px white",color:'white'}}>{walletAmount}</h2>                    

          <img src={logout} style={{height:'50px',cursor:'pointer'}} onClick={goback}/>
          </div>
            </div>
            
      <div className="left-container col-4">
    
        <div className="input-container">
          <label htmlFor="bet-amount">Bet Amount:</label>
          <input type="number" id="bet-amount" className='inputboxes' disabled={gamestarted}/>
        </div>
        <div className="input-container">
          <label htmlFor="num-bombs">Number of Bombs (5-15):</label>
          <input type="number" id="num-bombs" min={5} className='inputboxes' onChange={e=>{changemultiplier(e)}} disabled={gamestarted}/>
        </div>
        <div>
          <label>Multiplier:</label>
          <span id="current-earnings" style={{color:'black'}}>{multiplier}X</span>
        </div>
        <div>
          <label>Current Earnings:</label>
          <span id="current-earnings" style={{color:'black'}}>{currentEarnings.toFixed(2)}<img src={coins} style={{height:'30px'}}/></span>
        </div>
        <button id="begin" onClick={initializeGame}>
          Begin
        </button>
        {gamestarted?<span style={{fontSize:'22px'}}>Now Click the Correct Boxes 💣/💎</span>:null}
        {gamestarted?<button id="cash-out" onClick={cashOut}>
          Cash Out
        </button>:null}
      </div>

      <div className="game-container col-8">
        {/* Game grid will be dynamically generated here */}
        {squares.map((square) => (
          <div
            key={square.index}
            className={`square ${square.revealed ? 'revealed' : ''}`}
            onClick={() => revealSquare(square.index)}
            
          >
            {square.revealed && (square.isBomb ? <iframe style={{height:'100%',width:'100%'}} src={ bombgif} ></iframe>:<iframe style={{height:'100%',width:'100%'}} src={ diamondgif} ></iframe>
)}
          </div>
        ))}
      </div>
     

    </div>
    {rewardadd? <div className='winningrewardg4'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningrewardg41'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningrewardg42'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
    </>
  );
}

export default BombvsGem;
