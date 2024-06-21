import React, { useState,useEffect} from 'react';
import rocket from '../rocket.png'
import './CrashGame.css'
import blast from '../blast.gif'
import spacebackground from '../spacebackground.jpg'
import money from '../money.png';
import wallet from '../wallet.png'
import rocketready from '../rocket3.png'
import { useNavigate ,useLocation} from "react-router-dom";
import supernova from '../supernova-removebg-preview.png'
import logout from '../exit.png';
import rupee from '../rupee.png'
import coins from '../coin.png'
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import questionmark from '../question-mark.png'
import { CountUp } from 'use-count-up'
import { useCountUp } from 'react-countup';
import  bottomblast from '../XZ5N-ezgif.com-resize.gif'
import marsplanet from '../marssurface5.png'
const CrashGame = () => {
let ranval=(Math.random()*0)+1
let doublevalue=1;
const [show, setShow] = useState(true);
const handleClose = () => setShow(false);
// var randomnum=(Math.random()*ranval)+1
    const [randomnum,setrandomnum]=useState((Math.random()*2)+1);
    const [showrocket,setshowrocket]=useState(true);
    const [showblast,setshowblast]=useState(false);
    const [balance,setbalance]=useState(0);
    const [bettingamt,setbettingamt]=useState(0);
    const [inputbox,setinputbox]=useState(0);
    const [showcashout,setcashout]=useState(false);
    const [showplaybtn,setshowplaybtn]=useState(false);
    const [btnname,setbtnname]=useState('PLAY');
    const [countdownpage,setcountdownpage]=useState(true);
    const [blasted,setblasted]=useState(false);
    const [message,setmessage]=useState('');
    const [amounttake,setamounttake]=useState(false);
    const [rewardadd,setrewardadd]=useState(false);
    const [isTabActive, setIsTabActive] = useState(true);
    const [gettingx,setgettingx]=useState(1);
    const [slno,setslno]=useState('');
const [recentboom,setrecentboom]=useState([]);
    const location = useLocation();
    
    const navigate = useNavigate();
   
    window.location.hash = "no-back-button";


    window.onhashchange = function(){
        window.location.hash = "no-back-button";
    }
    const user_id=localStorage.getItem('user_id');
    useEffect(()=>{
        axios({
            url: `${window.baseUrl}user/${user_id}`,
            method: "get",
           
        })
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    const walletbalance=res.data.walletBalance;
                    console.log(walletbalance)
                        setbalance(Number(walletbalance).toFixed(2));
                    }else{
                        setbalance(localStorage.getItem('walletBalance'))
                    }
            })    
  
    },[])
    useEffect(()=>{

        setamounttake(false);
        setrewardadd(false);
        setblasted(false);

        setTimeout(() => {     
            console.log(btnname);
            setshowplaybtn(true);
            setshowrocket(false)
        setcountdownpage(false)
        
        console.log(location.pathname);
        document.getElementById('rocketblast').style.animation='blast 5s'
        document.getElementById('marsplanet').style.animation=`surface ${randomnum==1?0:2}s`
setTimeout(() => {
    document.getElementById('marsplanet').style.display='none';
},randomnum==1?0:2*1000);

        setTimeout(() => {
            setcashout(false)
            setblasted(true);
            setshowblast(true);
setTimeout(() => {
    setshowrocket(true)
    setshowblast(false);
    document.getElementById('scrollimg').style.animationPlayState='paused';
    document.getElementById('rocketblast').style.animation='none';
    setblasted(false);
    console.log(countdownpage);
    recentboom.unshift(randomnum.toFixed(2))
    console.log('recent boom',recentboom)
    setTimeout(() => {
        setbtnname("PLAY")
        setcountdownpage(true);
        setshowplaybtn(false);
        document.getElementById('resulttext').style.display='none'
        document.getElementById('marsplanet').style.animation='none'
        document.getElementById('marsplanet').style.display='block';

    }, 3000);
        document.getElementById('resulttext2').style.display='none'
        
// setrandomnum((Math.random()*ranval)+1)
    // xvalue();
}, 500);
        },(randomnum==1?0:randomnum>1.3?randomnum*3:randomnum)*1000);

        
    }, 7000);
    const handleVisibilityChange = () => {
        setIsTabActive(!document.hidden);
      };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    },[])

    useEffect(()=>{
        console.log(blasted,amounttake,btnname);

        if (btnname=="ACCEPTED"&&!amounttake&&blasted) {
            console.log('blast',amounttake);
                document.getElementById('resulttext2').style.display='inline'
            
        }
        if (btnname=="ACCEPTED"&&amounttake&&blasted) {
            console.log('blast',amounttake);
                document.getElementById('resulttext').style.display='inline'
            
        }
    },[btnname,amounttake,blasted])
    useEffect(() => {
        console.log('tabactive',isTabActive);
        if (!isTabActive) {
          window.location.reload();
        }
      }, [isTabActive]);


   const xvalue=()=>{
    console.log('xvaluecaled');
setblasted(false);
setTimeout(() => {
    setamounttake(false)
    setrewardadd(false);
}, 1000);

// if (bettingamt>1) {
//     setcashout(false)
// }
    setTimeout(() => {
        setshowrocket(false);
setcountdownpage(false);
        setshowplaybtn(true);
        document.getElementById('scrollimg').style.animationPlayState='initial';
        document.getElementById('rocketblast').style.animation='blast 5s'
        ranval=((Math.random()))
        var randomvariable=(Math.random()*ranval)+1
        if (ranval>0.9) {
          randomvariable=(Math.random()*8)+4
          console.log(ranval);

        }
        else if (ranval>0.6&&ranval<=0.9)
        {
            randomvariable=(Math.random()*2)+2
            console.log(ranval);

        }
        else if(ranval<=0.6&&ranval>=0.14)
        {
            console.log(ranval);

            randomvariable=(Math.random()*1)+1
        }else{
            console.log(ranval);

            randomvariable=1;
        }
        console.log(randomvariable);
        setrandomnum(randomvariable);
        document.getElementById('marsplanet').style.animation=`surface ${randomvariable==1?0:2}s`
        setTimeout(() => {
            document.getElementById('marsplanet').style.display='none';
        },randomvariable==1?0:2*1000);
   setTimeout(() => {
        setcashout(false)
        setblasted(true);
        setshowblast(true)
setTimeout(() => {
setshowrocket(true)
setshowblast(false);
setblasted(false);
document.getElementById('scrollimg').style.animationPlayState='paused';
document.getElementById('rocketblast').style.animation='none';
recentboom.unshift(randomvariable.toFixed(2))
console.log('recent boom',recentboom)
setTimeout(() => {
    setbtnname("PLAY")
    setcountdownpage(true);
    setshowplaybtn(false);
    document.getElementById('resulttext').style.display='none'
    document.getElementById('marsplanet').style.animation='none'
    document.getElementById('marsplanet').style.display='block';


}, 3000);
    document.getElementById('resulttext2').style.display='none'
    
console.log(amounttake);


}, 500);
    },(randomvariable==1?0:randomvariable>1.30?randomvariable*3:randomvariable)*1000);
    }, 8000);

  
    return { shouldRepeat: true,delay:8}

   }
   const setbetamount=(e)=>{
    setinputbox(Math.abs(e.target.value));
console.log(e);

       }
   const amountadd=async()=>{
    console.log(balance);
    console.log(inputbox);
    if (balance>=inputbox&&inputbox>=1) {
        let data = JSON.stringify({
            "walletBalance" : balance,
            "betAmount" : inputbox,
            "gameId":1
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
                setbtnname("ACCEPTED");
                const calcbalance=(balance-inputbox).toFixed(2)
                console.log(Number(calcbalance));
                setbalance(Number(res.data.newWalBal).toFixed(2) )
                console.log(inputbox);
                setbettingamt(inputbox)
                setcashout(true)
        setinputbox(0);
        document.getElementById('amtbox').value="";
      }
            } else {
        }
          } catch (err) {
         }
       


// debugger;

    }else{
        alert('Insufficient Balance')
    }
// setbettingamt(inputbox);
   }
   const checkblast=async()=>{
    if (blasted) {

    }else{
        setcashout(false)
        setamounttake(true)
        setrewardadd(true);

        setgettingx('');
        let data = JSON.stringify({
            "multiplier": Number(doublevalue),
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
                setgettingx(doublevalue);
                console.log(doublevalue);
                console.log(Number(bettingamt) +" "+Number(doublevalue)+"="+Number(bettingamt)*Number(doublevalue));
                const calcbalance=Number(bettingamt)*Number(doublevalue);
                console.log('total',Number((Number(balance)+Number(calcbalance)).toFixed(2)));
                setbalance(Number(res.data.newWalBal).toFixed(2))
                setTimeout(() => {
                    setrewardadd(false);
                }, 1500);
            }
          } catch (err) {
         }
      
    }
   }
   const goback=()=>{
    console.log('clicked');
    navigate('/allgames')
    window.location.reload()
   }
   
  return (
    <div className='container'>
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
        1)Place your bet  amount and <b>Click Play</b> before the rocket takes off <br/>
        2)<b>Cash Out</b> before the rocket crashes<br/>
        3)Bet Amount <b style={{color:'red'}}>x</b> Multiplier at the time of cash out= <b style={{color:'green'}}>Your Winnings</b><br/>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'aliceblue',fontFamily:'poppins'}} >
          <button className="btn3" variant="primary" onClick={handleClose}>Understood</button>
        </Modal.Footer >
      </Modal>
        {/* <embed name="myMusic" src={rocketaudio} type="audio/midi"
 autostart="false" Hidden="true" loop="true" ></embed> */}
  {/* <h1 style={{color:'white',background:message=="win"?'red':"green"}}>{message}</h1> */}
        <div class="scrolling-image-container">
 <div class="scrolling-image" id='scrollimg'></div>
 {!countdownpage?<h1 style={{position:'fixed',width:'fit-content',top:'20%',left:'10%',color:'white',fontFamily:'poppins',fontStyle:'italic',textShadow:'2px 2px 10px #09f309','-webkit-text-stroke-color':'#fff','-webkit-text-stroke-width': '1px'}} >
        <CountUp isCounting start={1} end={randomnum} duration={randomnum>1.30?randomnum*3:randomnum} decimalPlaces={2} decimalSeparator='.' easing={'linear'} onComplete={xvalue} onUpdate={(currentvalue)=>{doublevalue=currentvalue}}  id="count"/> x
        </h1>:null}
        
       {btnname==="ACCEPTED"?
       <div style={{position:'fixed',fontFamily:'poppins',fontStyle:'italic',width:'fit-content',top:'30%',left:'10%',display:'flex',color:'#09f309',textShadow:'2px 2px 10px #09f309','-webkit-text-stroke-color':'#fff','-webkit-text-stroke-width': '1px' }}><h2>Bet Amount:₹{bettingamt}</h2>&nbsp;&nbsp;{amounttake?<h2>x&nbsp;{gettingx}</h2>:null}
       </div>:null}
        <div className='showwallet'>
<img src={wallet} style={{height:'50px'}}/><h2 style={{fontWeight:'bolder'}}>{balance}</h2>
        </div>
       {btnname=="PLAY"?<img src={logout} style={{height:'50px',position:'fixed',top:'20%',right:'5%',cursor:'pointer'}} onClick={goback}/>:null}

      
       
</div>

       
         {/* <marquee behavior="scroll" direction="down">
            <img src={spacebackground} style={{height:'100vh',width:'100vw'}}/>
         </marquee> */}
     <div className='rocketblast' id='rocketblast'>
     {!showrocket?<><img  className='rocket' src={rocket}/><iframe className='rocketfire' src={bottomblast} ></iframe></>:null}
     {showblast?<iframe className='explosion' src={blast} ></iframe>:null}
       
</div>
{!countdownpage&&btnname=='PLAY'?<h1 className='texts' style={{position:'fixed',top:'70%',left:'35%',height:'200px'}}>Waiting for next round</h1>:null}
{countdownpage?<div style={{position:'fixed',top:'40%',left:'35%',height:'200px'}} >
    <img src={rocketready} style={{height:'150px'}} className='readytogo'/>
    <h2 className='texts'>Next Round Starts in <CountUp isCounting start={8} end={0} duration={5}  easing={'linear'}  /> </h2>
</div>:null}
{!countdownpage?<div style={{position:'fixed',top:'50%',left:'35%'}} >
   
</div>:null}
<div className='playbtn row' id='playbtn'>
       {/* <div>{doublevalue}*{bettingamt} </div> */}
            <input placeholder='enter the amount' type='text' className='input col-4' id='amtbox' onChange={e=>{setbetamount(e)}}  min={0}  onKeyDown={(e) => {
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
        }}></input>
            {showcashout&&!countdownpage? <button class="button" onClick={checkblast}>
  CASH OUT<img src={money} style={{height:'100%'}}/>
</button>:
            <button class="btn col-8 " type="button" onClick={amountadd} disabled={!inputbox>0||showplaybtn||btnname=="ACCEPTED"}>
  <strong>{btnname}<img src={rupee} style={{height:'20%',width:'20%'}}/></strong>
  <div id="container-stars">
    <div id="stars"></div>
  </div>

  <div id="glow">
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</button>}
{/* <embed name="GoodEnough" src={rocketaudio} loop="false" hidden="true" autostart="true"></embed> */}


<h1 className='resulttext' id='resulttext'>WINNING AMOUNT
    <h2 className='texts'>{Number((Number(bettingamt)*Number(gettingx)).toFixed(2))}  <img src={coins} style={{height:'50px'}} /></h2></h1>
<h1 className='resulttext2' id='resulttext2'>BOOM</h1>


        </div>
        {recentboom.length>0?
        <div className='row recentboom'>
           <div className='recentboomboxrow'>
           <h3  style={{color:'white',margin:0,textAlign:'start',fontFamily:'poppins',fontStyle:'italic',textShadow:'2px 2px 10px #09f309','-webkit-text-stroke-color':'#fff','-webkit-text-stroke-width': '1px'}}>Recent Boom<img src={supernova} style={{height:'30px'}} />:</h3>
           {recentboom.slice(0,5).map((level, index) => (
                   <span className='recentboombox'  style={{color:`${level>4?'#13d913':level>2&&level<4?'antiquewhite':level<2?'red':'white'}`,border:'2px solid '}} key={index} value={level}>{level}X</span>
                ))}
                </div>
        </div>:null}
        {rewardadd? <div className='winningreward'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningreward1'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        {rewardadd? <div className='winningreward2'>
        <img className='spinrupees' src={rupee} style={{height:'10%',width:'10%'}}/>
        </div>:null}
        <div className='marsplanet' id='marsplanet'>
    <img src={marsplanet} style={{width:'100%',height:'100%'}}/>
</div>
       </div>

         );
};
export default CrashGame;