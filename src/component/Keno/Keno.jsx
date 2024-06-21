import React, { useState, useEffect } from 'react';
import '../Keno/Keno.css'
import logout from '../../exit.png';
import { useNavigate ,useLocation} from "react-router-dom";
import wallet from '../../wallet.png'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import questionmark from '../../question-mark.png'
import rupee from '../../rupee.png'

const KenoGame = () => {
    const [rewardadd, setrewardadd] = useState(false);
    const navigate = useNavigate();
    var slno=0;
    const user_id=localStorage.getItem('user_id');
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [betAmount, setBetAmount] = useState('');
    const [riskLevel, setRiskLevel] = useState('low');
    const [walletAmount, setWalletAmount] = useState(0);
    const [result, setResult] = useState('');
    const riskLevels = ['low', 'medium', 'high'];
 const numberGrid=[];
 for (let i = 1; i <= 80; i++) {
 
    numberGrid.push(
        <div key={i} className={`number  ${selectedNumbers.includes(i) ? 'selected' : ''}`} onClick={() => toggleNumber(i)}>
            {i}
        </div>
    );
}
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
 
    // const numberGrid = [];
       
 
    const goback=()=>{
        navigate('/allgames')
    
       }
    const toggleNumber = (number) => {
        const limit=riskLevel=='low'?8:riskLevel=='medium'?5:3
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter(n => n !== number));
        } else {
            if (selectedNumbers.length <limit) {
                console.log(riskLevel,limit);
                setSelectedNumbers([...selectedNumbers, number]);
               } else {
                alert("Selection Limit is Reached!");
            }
        }
    };
 
    const play = async() => {
        resetDrawnNumbers();
        resetTable();
        const drawnNumbers = [];
        let i = 0;
        if (isNaN(betAmount) || Number(betAmount) <= 0) {
            alert("Please enter a valid bet amount!");
            return;
        }
        if(selectedNumbers.length < 1){
            alert("Please Select the Numbers")
            return;
 
        }
        if(Number(betAmount)>Number(walletAmount)){
            console.log(Number(betAmount)>Number(walletAmount));
            alert('Insufficient Balance')
            return;
        }
        let data = JSON.stringify({
            "walletBalance" : walletAmount,
            "betAmount" : betAmount,
            "gameId":5
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
       
              slno=res.data.slno
                setWalletAmount(Number(res.data.newWalBal).toFixed(2) )
      }
            } else {
        }
          } catch (err) {
         }
        const drawInterval = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 80) + 1;
            drawnNumbers.push(randomNum);
            const numberDiv = document.querySelector(`.number:nth-child(${randomNum})`);
            if (selectedNumbers.includes(randomNum)) {
                numberDiv.classList.add('matched');
            } else {
                numberDiv.classList.add('drawn');
            }
            i++;
            if (i === 10) {
                clearInterval(drawInterval);
                const matches = selectedNumbers.filter(n => drawnNumbers.includes(n)).length;
                const multiplier = calculateMultiplier(matches, betAmount);
                multiplier.then(function (val) {
setResult(matches > 0 ? `${matches} number(s) matched on your selection, and you won ₹${val.toFixed(2)}!` : "No matches. Try again!")                });
            
            }
        }, 200);
    };
 

 
    const calculateMultiplier = async(matches) => {
        console.log(slno);
        let winning_amt=0
        if (riskLevel=='low') {
            winning_amt= betAmount*matches*1.2;
        }
        else if(riskLevel=='medium'){
            winning_amt= betAmount*matches*1.5;
        }else{
            winning_amt= betAmount*matches*2;
        }
        if (matches>0) {
            console.log(slno);
            setrewardadd(true);
            let data = JSON.stringify({
                "result": "win",
                 "winningAmount":Number(winning_amt).toFixed(2)
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
                    setWalletAmount(res.data.newWalBal.toFixed(2))
                    console.log(winning_amt);
                }
              } catch (err) {
             }

        }
        
        return Number(winning_amt);

    };
 
    const resetDrawnNumbers = () => {
        const drawnNumbers = document.querySelectorAll('.drawn, .matched');
        drawnNumbers.forEach(number => {
            number.classList.remove('drawn');
            number.classList.remove('matched');
        });
    };
 
    const resetTable = () => {
        const tableCells = document.querySelectorAll('td');
        tableCells.forEach(cell => {
            cell.classList.remove('selected-column');
        });
    };
 
    const reset = () => {
        setSelectedNumbers([]);
        resetDrawnNumbers();
        setBetAmount('');
        setResult('');
        resetTable();
    };
 
 
 
    return (
        <div id="game-container">
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
        1)Enter the bet amount and select the risk type.<br/>
2)Based on the selected risk type, the multiplier and number of selectable numbers will vary.<br/>
3)The number of player selections match with the system drawn numbers, player wins the amount equal to the selections matched <b>X</b> muiltiplier.<br/>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'aliceblue',fontFamily:'poppins'}} >
          <button className="btn3" variant="primary" onClick={handleClose}>Understood</button>
        </Modal.Footer >
      </Modal>
      {rewardadd? <div className='winningrewardg5'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningrewardg51'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningrewardg52'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
            <div className='row' style={{width:'100vw',fontFamily:'poppins',fontWeight:'bolder',marginTop:'10px'}}>
         
                <div className='col-8' style={{textAlign:'end',paddingRight:'5%'}}>
                <h1 style={{fontWeight:'bolder'}} >Keno Game</h1>
                </div>
<div className='col-4' style={{display:'flex',justifyContent:'end',fontFamily:'poppins',fontWeight:'bolder',alignItems:'center',gap:'20px'}}>
<img src={wallet} style={{height:'50px'}}/><h2 style={{fontWeight:'bolder'}}>{walletAmount}</h2>                    

<img src={logout} style={{height:'50px',cursor:'pointer'}} onClick={goback}/>

</div>
    
          </div>
            <div id="numbergrid">
            {numberGrid}
            </div>
            <div style={{display:'flex',gap:'20px',padding:'10px'}}>
            <input type="number" id="bet-input" placeholder="Enter bet amount" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} />
            <select id="risk-level" onChange={(e) => {setRiskLevel(e.target.value);setSelectedNumbers([]);resetDrawnNumbers();}}>
                {riskLevels.map((level, index) => (
                    <option key={index} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)} Risk</option>
                ))}
            </select>
            <span style={{fontWeight:'bolder'}}>Get {`${riskLevel=='low'?1.2:riskLevel=='medium'?1.5:2}`}X</span>


            </div>
            <div id="controls" style={{display:'flex',gap:'20px'}}>
            <span style={{fontWeight:'bolder'}}>Select any {`${riskLevel=='low'?8:riskLevel=='medium'?5:3}`} Numbers</span>
                <button className='btn3' onClick={play}>Play</button>
                <button className='btn3' onClick={reset}>Reset</button>
            </div>
            <div id="result" style={{fontWeight:'bolder', textShadow:
                        "0 0 10px red, 0 0 20px  red, 0 0 30px  red, 0 0 40px white, 0 0 70px white, 0 0 80px white, 0 0 100px white, 0 0 150px white",color:'white'}}>{result}</div>
           
        </div>
    );
}
 
export default KenoGame;
