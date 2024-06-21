import React, { useState,useEffect} from 'react';
import './Listofgames.css'
import wallet from '../wallet.png'
import crashlogo from '../game1.png';
import Guesscards from '../game2.png'
import { useNavigate ,useLocation} from "react-router-dom";
import logout from '../logout.png'
import highorlowimg from '../game3.png'
import { IoLogOut } from "react-icons/io5";
import treasureimg from '../treasure3.jpeg'
import kenoimg from '../KENO.png';
import axios from "axios";
import LazyLoad from 'react-lazyload';
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import boy from '../avatarimg.png'
import leaderboardimg from '../podium.png';
import leaderboardimg1 from '../medal.png';
import { Button, Col, Modal ,Row} from 'react-bootstrap';
import goldmedal from '../gold-medal.png';
import silvermedal from '../silver-medal.png';
import bronzemedal from '../bronze-medal.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { VscFeedback } from "react-icons/vsc"
import { FcFeedback } from "react-icons/fc";
import { AiOutlineStar} from "react-icons/ai";
import { AiFillStar} from "react-icons/ai";
import feedbackgif from '../review.png'
import feedbackicn from '../satisfaction.png'
import addcashicn from  '../income.png'
import { sliderClasses } from '@mui/material';

const Listofgames=()=>{
    const navigate = useNavigate();
    const [feedback,setfeedback]=useState('');
    const [addcash,setaddcash]=useState('');
const [allgames,setallgames]=useState([])
const [allusers,setallusers]=useState([])
const [selectuser,setselectuser]=useState();
const [selectgame,setselectgame]=useState();
    const [balance,setbalance]=useState(0);
    const user_name=localStorage.getItem('user_name');
    const admin=localStorage.getItem('admin');
console.log(admin);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [leaderboard,setleaderboard]=useState([]);
    const[showModal,setshowModal]=useState(false);
    const[showModal1,setshowModal1]=useState(false);
    const [starrating,setstarrating]=useState(0);
    const user_id=localStorage.getItem('user_id');


    const handleCloseModal=()=>{
      setshowModal(false);
      setshowModal1(false)
      setstarrating(0)

      }
      const starselect=(key)=>{
          setstarrating(key);
      }
      const feedbacktext=(e)=>{
        setfeedback(e.target.value);
      }
      const addcashfun=(e)=>{
        setaddcash(e.target.value);
      }
      const selectuserfun=(e)=>{
        console.log(e.target.value);
        setselectuser(e.target.value);
      }
      const selectgamefun=(e)=>{
        console.log(e.target.value);
        setselectgame(e.target.value);
      }
      const depositcash=()=>{
        const id = toast.loading("Please wait...",{autoClose : 5000
        })
        console.log(selectuser);
        console.log(addcash)
 
        const payload=JSON.stringify(
          {
            'amount':Number(addcash),
          }
        );
        const config = {
          headers:{
            'Content-Type': 'application/json',
          }
        }
        if (selectuser&&addcash>0) {
          axios.post(`${window.baseUrl}user/update/${selectuser}`,payload,config)
          .then(response => {
            console.log(response.data);
            if (response.data) {
              setshowModal1(false);
              setaddcash(0)
              setselectuser('')
              toast.update(id,{ render: "Cash added successfully!", type: "success", isLoading: false, autoClose:3000,closeButton:true,theme:'colored',progress:undefined});   
            }
            else{
              toast.update(id,{ render: "something wrong please try again later", type: "error", isLoading: false, autoClose:3000,closeButton:true,theme:'colored',progress:undefined});
  
            }
        })
      }
      else{
        toast.update(id,{ render: "fill the form", type: "error", isLoading: false, autoClose:3000,closeButton:true,theme:'colored',progress:undefined});

      }
        console.log('payload',payload);
      }
      const submitfeedback=()=>{
        const id = toast.loading("Please wait...",{autoClose : 5000
        })
        console.log(feedback);
        console.log(starrating);
        const payload=JSON.stringify(
          {
            'game':selectgame,
            'text':feedback,
            'rating':starrating
          }
        );
        const config = {
          headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`
          }
        }
        if (starrating>=1&&selectgame) {
          axios.post(`${window.baseUrl}usrgamefb/addUsrGameFb`,payload,config)
          .then(response => {
            console.log(response.data);
            if (response.data) {
              setshowModal(false);
              setstarrating(0)
              setselectgame('')
              toast.update(id,{ render: "Thank You for Your Feedback!", type: "success", isLoading: false, autoClose:3000,closeButton:true,theme:'colored',progress:undefined});   
            }
            else{
              toast.update(id,{ render: "something wrong please try again later", type: "error", isLoading: false, autoClose:3000,closeButton:true,theme:'colored',progress:undefined});
  
            }
        })
        }else{
          toast.update(id,{ render: "fill the form", type: "error", isLoading: false, autoClose:3000,closeButton:true,theme:'colored',progress:undefined});

        }
       
        console.log('payload',payload);
      }
    useEffect(()=>{
        axios({
            url: `${window.baseUrl}user/${user_id}`,
            method: "get",
           
        })
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                const walletbalance=res.data.walletBalance;
                
                    setbalance(Number(walletbalance).toFixed(2));
                }else{
                    setbalance(localStorage.getItem('walletBalance'))
                }
            })    
  
            axios({
              url: `${window.baseUrl}gameNames`,
              method: "get",
             
          })
              .then((res) => {
                  console.log(res.data);
                  if (res.data) {
                setallgames(res.data)
                  }else{
                  }
              })   

              axios({
                url: `${window.baseUrl}user/users/admin`,
                method: "get",
               
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data) {
                  setallusers(res.data)
                    }else{
                    }
                })   
    },[])

const openleaderboard=()=>{
  axios({
    url: `${window.baseUrl}user/getgamestats`,
    method: "get",
   
})
    .then((res) => {
        console.log(res.data.length);
        if (res.data.length>0) {
       setleaderboard(res.data);
        console.log(res.data);
        setShow(true);
        }else{
          alert('something  wrong try again')
        }
    })    


}


const logoutfun=()=>{
    navigate('/')
    localStorage.clear('user_id')
}
    return(
        <div className='container1'>
           <Modal show={showModal1} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title style={{color:"gray",fontFamily:'poppins'}}>Deposit Cash<img style={{height:'50px',margin:'5px'}}  src={addcashicn} /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row style={{display:'flex',justifyContent:'center',margin:'10px'}}>
          <Col md='4' className='m-0 p-0'>
          <label style={{fontSize:"16px",margin:'0',padding:'0',fontFamily:'poppins',fontWeight:'bolder'}}>User Name:</label>
          </Col>
          <Col md="6">
          <select  style={{width:'100%',borderRadius:'10px',border:'2px solid',fontFamily:'poppins',margin:'0',padding:'0'}} onChange={e=>selectuserfun(e)} >
          <option value="" >
          Select an option
        </option>
        {
    allusers.map( (x,y) => 
      <option key={y} value={x.employeeId} >{x.userName}</option>
  )
  }</select>  
          </Col>
                 </Row>
            <Row style={{display:'flex',justifyContent:'center'}}>
            <input id="feed-back-area" type='number' placeholder="Enter the amount" style={{width:'80%',borderRadius:'10px',border:'2px solid',fontFamily:'poppins'}} onChange={e=>addcashfun(e)}/>
            </Row>
        </Modal.Body>
        <Modal.Footer >
          <button className='btnfeedback' style={{background:'#32d736'}} onClick={handleCloseModal}>
          Close
          </button>
          <button className='btnfeedback' style={{background:'#32d736'}} onClick={depositcash}>
            Deposit
          </button>
        </Modal.Footer>
      </Modal>
                <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"gray",fontFamily:'poppins'}}>Feed Back <img style={{height:'50px',marginTop:'-15px'}}  src={feedbackgif} /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row style={{display:'flex',justifyContent:'center',margin:'10px'}}>
          <Col md='4' className='m-0 p-0'>
          <label style={{fontSize:"16px",margin:'0',padding:'0',fontFamily:'poppins',fontWeight:'bolder'}}>Select the Game:</label>
          </Col>
          <Col md="6">
          <select style={{width:'80%',borderRadius:'10px',border:'2px solid',fontFamily:'poppins',margin:'0',padding:'0'}} onChange={e=>selectgamefun(e)} >
          <option style={{color:'blue',fontWeight:'bold'}} value="" >
          Select an option
        </option>
        {
    allgames.map( (x,y) => 
      <option key={y} value={x}>{x}</option> )
  }</select>  
          </Col>
                 </Row>
            <Row style={{display:'flex',justifyContent:'center'}}>
            <textarea id="feed-back-area" placeholder="Enter your FeedBack" style={{width:'80%',borderRadius:'10px',border:'2px solid',fontFamily:'poppins'}} onChange={e=>feedbacktext(e)}/>
            </Row>
            <Row style={{textAlign:'center',marginTop:'10px'}}>                
             <Col>
             {starrating>=1?<AiFillStar style={{fontSize:'50px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(1)}/>:<AiOutlineStar   style={{fontSize:'45px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(1)}/>}
             {starrating>=2?<AiFillStar style={{fontSize:'50px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(2)}/>:<AiOutlineStar   style={{fontSize:'45px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(2)}/>}
             {starrating>=3?<AiFillStar style={{fontSize:'50px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(3)}/>:<AiOutlineStar   style={{fontSize:'45px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(3)}/>}
             {starrating>=4?<AiFillStar style={{fontSize:'50px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(4)}/>:<AiOutlineStar   style={{fontSize:'45px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(4)}/>}
             {starrating>=5?<AiFillStar style={{fontSize:'50px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(5)}/>:<AiOutlineStar   style={{fontSize:'45px',margin:'5px',color:'FFDF00'}} onClick={()=>starselect(5)}/>}
             </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer >
          <button className='btnfeedback'  onClick={handleCloseModal}>
          Not Now
          </button>
          <button className='btnfeedback' onClick={submitfeedback}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
           <Modal
        show={show}
        fullscreen
        size='xxl'
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        
      >
        <Modal.Header closeButton style={{backgroundColor:'aliceblue',fontFamily:'poppins'}}>
          <Modal.Title>LeaderBoard<img src={leaderboardimg1} style={{height:'40px'}} />
</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'aliceblue',fontFamily:'poppins'}}>
        <div className='row'  style={{margin:'2px',fontStyle:'poppins',fontWeight:'bolder',padding:'5px'}}>
      <div className='col' style={{padding:0,border:'2px solid',margin:0,textAlign:'center'}}>position</div>
      <div className='col-3' style={{border:'2px solid',}} >Name</div>
      <div className='col-7'  style={{border:'2px solid'}}>
        <div className='row' style={{border:'2px solid',display:'flex',justifyContent:'center'}}>No of plays</div>
        <div className='row' >
          <div className='col' style={{border:'2px solid',fontSize:'16px'}}>Crash Game</div>
          <div className='col' style={{border:'2px solid',fontSize:'16px',textAlign:'c'}}>Guess the card</div>
          <div className='col' style={{border:'2px solid',fontSize:'16px',textAlign:'center'}}>High or Low</div>
          <div className='col' style={{border:'2px solid',fontSize:'16px',textAlign:'center'}}>Treasure Hunt</div>
          <div className='col' style={{border:'2px solid',fontSize:'16px',textAlign:'center'}}>Keno</div>
        </div>
      </div>
      <div className='col' style={{border:'2px solid',textAlign:'center'}} >Win Percent</div>
      </div>
        {leaderboard.map((list,index) => (
     <div className='row' key={index} style={{margin:'2px',fontStyle:'poppins',fontWeight:'bolder',padding:'5px',backgroundColor:list.user_name.includes(user_name)?'black':'none',color:list.user_name.includes(user_name)?'white':'none'}}>
      <div className='col' style={{display:'flex',justifyContent:'center',alignItems:'center',border:'2px solid'}}>{index+1==1?<img src={goldmedal} style={{height:'25px'}} />:index+1==2?<img src={silvermedal} style={{height:'25px'}} />:index+1==3?<img src={bronzemedal} style={{height:'25px'}} />:index+1}</div>
      <div className='col-3' style={{display:'flex',alignItems:'center',border:'2px solid'}}>{list.user_name}</div>
      <div className='col-7'>
        <div className='row' style={{height:'100%'}} >
          <div className='col' style={{border:'2px solid',display:'flex',justifyContent:'center',alignItems:'center'}}>{list.crash}</div>
          <div className='col' style={{border:'2px solid',display:'flex',justifyContent:'center',alignItems:'center'}}>{list.cards1}</div>
          <div className='col' style={{border:'2px solid',display:'flex',justifyContent:'center',alignItems:'center'}}>{list.cards2}</div>
          <div className='col' style={{border:'2px solid',display:'flex',justifyContent:'center',alignItems:'center'}}>{list.treasure}</div>
          <div className='col' style={{border:'2px solid',display:'flex',justifyContent:'center',alignItems:'center'}}>{list.keno}</div>
        </div>
      </div>
      <div className='col' style={{border:'2px solid',display:'flex',justifyContent:'center',alignItems:'center',padding:'5px'}} ><ProgressBar animated now={Math.floor(list.percent_wins)} label={`${Math.floor(list.percent_wins)}%`} style={{width:'100px'}}/></div>   
      
        </div>
     
        ))}
        </Modal.Body>
        
      </Modal>
            <div className='row' style={{backgroundColor:'white',height:'12vh',display:'flex',justifyContent:'center',color:'black',width:'100%',margin:0,fontFamily:'poppins', boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px'}}>
<div className='col col-md-4' style={{textAlign:'start',padding:'10px',height:'100%',fontFamily:'poppins',fontWeight:'bolder'}}>
<img src={boy} style={{height:'50px',cursor:'pointer'}} />&nbsp;&nbsp;&nbsp;&nbsp;
    {user_name}
</div>
<div className='col col-md-8' style={{display:'flex',justifyContent:'end',padding:'10px',height:'100%',gap:'50px'}}>
{admin=='true'?<img src={addcashicn} style={{height:'50px',cursor:'pointer',marginTop:'5px'}} onClick={e=>{setshowModal1(true)}}/>:null}
<img src={feedbackicn} style={{height:'50px',cursor:'pointer'}} onClick={e=>{setshowModal(true)}}/>
<img src={leaderboardimg} style={{height:'50px',cursor:'pointer'}} onClick={openleaderboard}/>
<h2 style={{fontWeight:'bolder'}}><img src={wallet} style={{height:'50px'}}/>&nbsp;&nbsp;{balance}</h2><IoLogOut style={{fontSize:'50px',cursor:'pointer'}} onClick={logoutfun}/>

        </div>
            </div>
            <LazyLoad height={200} offset={100}>
            <div className='row' style={{width:'100%',padding:'10px',margin:'auto'}}>
            <div className="card1" style={{width:"16rem",height:'16rem',margin:'15px',padding:'5px',borderRadius:'10px',backgroundImage:`url(${crashlogo})`,backgroundSize:'cover',backgroundPosition:'center',display:'flex',justifyContent:'center',alignItems:'end',border:'2px solid white'}}>
  <div className="card-body">
    <h5 className="card-title" style={{fontWeight:'bold'}}>Crash Game</h5>
    <button className='btn1' onClick={e=>{navigate('/crashgame')}}>PLAY</button>
  </div>
</div>
            
<div className="card1" style={{width:"16rem",height:'16rem',margin:'15px',padding:'5px',borderRadius:'10px',backgroundImage:`url(${crashlogo})`,backgroundSize:'cover',backgroundPosition:'center',backgroundImage:`url(${Guesscards})`,backgroundSize:'cover',display:'flex',justifyContent:'center',alignItems:'end',border:'2px solid white'}}>
  <div className="card-body">
    <h5 className="card-title" style={{fontWeight:'bold'}}>Guess The Card</h5>
    <button className='btn1' onClick={e=>{navigate('/Guessthecard')}}>PLAY</button>
  </div>
</div>
<div className="card1" style={{width:"16rem",height:'16rem',margin:'15px',padding:'5px',borderRadius:'10px',backgroundImage:`url(${highorlowimg})`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat',display:'flex',justifyContent:'center',alignItems:'end',border:'2px solid white'}}>
  <div className="card-body">
    <h5 className="card-title" style={{fontWeight:'bold'}}>High or Low</h5>
    <button className='btn1' onClick={e=>{navigate('/highorlow')}}>PLAY</button>
  </div>
</div>
<div className="card1" style={{width:"16rem",height:'16rem',margin:'15px',padding:'5px',borderRadius:'10px',backgroundImage:`url(${treasureimg})`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat',display:'flex',justifyContent:'center',alignItems:'end',border:'2px solid white'}}>
  <div className="card-body">
    <h5 className="card-title" style={{fontWeight:'bold'}}>Treasure Hunt</h5>
    <button className='btn1' onClick={e=>{navigate('/BombvsGem')}}>PLAY</button>
  </div>
</div>
<div className="card1" style={{width:"16rem",height:'16rem',margin:'15px',padding:'5px',borderRadius:'10px',backgroundImage:`url(${kenoimg})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',display:'flex',justifyContent:'center',alignItems:'end',border:'2px solid white'}}>
  <div className="card-body">
    <h5 className="card-title" style={{fontWeight:'bold'}}>Keno</h5>
    <button className='btn1' onClick={e=>{navigate('/keno')}}>PLAY</button>
  </div>
</div>

            </div>
            </LazyLoad>
        </div>
    )
}
export default Listofgames;