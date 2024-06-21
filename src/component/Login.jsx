import React, { useState,useEffect} from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import organization from "../spacebackground.jpg";
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import { FaEye } from "react-icons/fa";
import './Login.css'
import { FaEyeSlash } from "react-icons/fa";
import { PiCopyrightThin } from "react-icons/pi";
import { FloatLabel } from 'primereact/floatlabel';
import startgame from '../game.png'
import { FaRegCirclePlay } from "react-icons/fa6";


// window.baseUrl = 'http://localhost:8082/gktsage/';
// window.baseUrl = 'http://digital.globalknowledgetech.com:8080/gkscholar/gktsage/'; 
// window.baseUrl='https://digital.globalknowledgetech.com:8243/gameapi/gktcrashgame/';
window.baseUrl='http://localhost:8081/gktcrashgame/';
// window.imgbaseUrl='https://digital.globalknowledgetech.com:8343/imgsvr/static/media'
// window.baseUrl='https://digital.globalknowledgetech.com:8343/gkscholar/gktsage/';
const LoginScreen = () => {
    const[userName, setUserName] = useState("");
   
    const[Password,setPassword] = useState("");
    const navigate = useNavigate();
    const[authority,setAuthority] = useState([]);
    const [showPassword, setShowPassword] = React.useState(false);
    const [eyeicon,seteyeicon]=useState("visible");
    let res;
    let themeColor = "primary";
    //const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show); 
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };
    const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };
    const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
    const handleSubmit = async(event) => {
    const id = toast.loading("Please wait...",{autoClose : 5000
     })
    if(userName.length === 0 || Password.length === 0){
      toast.update( { render: "Please enter all the fields", type: "error", isLoading: false, autoClose:3000,closeButton:true,progress:undefined});
    }
    else{
    event.preventDefault();
    let data = JSON.stringify({
      "usernameOrEmail" : userName,
      "password" : Password
    });
   try {
      const config = {
        headers : {'Content-Type' :  'application/json',
        'Access-Control-Allow-Origin' : 'true'},
    }  
    res = await axios.post(`${window.baseUrl}auth/signin`,data,config);
    localStorage.setItem("signInResponse",res);
    window.token = res.data.accessToken
    const user_name = res.data.userPrincipleDetails.username;
    const user_id = res.data.userPrincipleDetails.employeeId;
    const walletbalance=res.data.userPrincipleDetails.walletBalance;
    localStorage.setItem('walletBalance',walletbalance)
    localStorage.setItem('user_name',user_name);
    localStorage.setItem('user_id',user_id);
    localStorage.setItem('token',res.data.accessToken);
    localStorage.setItem("UserEmail",res.data.userPrincipleDetails.email);
    localStorage.setItem("admin",res.data.userPrincipleDetails.isadmin);

    
    if(res.status === 200){
      
      navigate('/allgames')

      toast.update(id,{ render: "Logged in Successfully", type: "success", isLoading: false, autoClose:3000,closeButton:true,theme:'colored',progress:undefined});
    
    }  else{
      toast.update(id, { render: "Error while Logging In !", type: "error", isLoading: false ,autoClose:3000,closeButton:true,theme:'colored',progress:undefined});    
    }  
}
 catch(err){
  if(err.response != undefined && err.response.status === 401){
      toast.update( id,{ render: err.response.data, type: "error", isLoading: false ,autoClose:3000,closeButton:true,theme:'colored',progress:undefined});
     } else{
      toast.update(id, { render: "Error while Logging In !", type: "error", isLoading: false ,autoClose:3000,closeButton:true,theme:'colored',progress:undefined});    
    }
  }
  }
}
useEffect(()=>{     
},[]);

  return (
    <div className='container6'>
      {/* <div style={{backgroundImage:"loginbg.png"}}> */}
     <div className='row ' style={{width:'100%'}}>
      <div className="col-md-12" >
        <div className='row' >
         
        </div>
        <div className='row'>
         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
           <Container maxWidth="xs" style={{marginLeft:'37%',marginTop:'10px'}}>
            <Box
             sx={{ 
             marginTop: 2,
             display: 'flex',
             justifyContent: 'center',
             flexDirection: 'column',
             alignItems: 'center',
            }}
            >       
        <Typography component="h1" variant="h5" style={{fontSize:"30px"}}>
        <i><h5 style={{color:"white",fontStyle:'Poppins'}}>Join Our World</h5></i>
          {/* <i><span style={{color:"#5D6D7E"}}>Join</span><span style={{color:"#5D6D7E"}}> Our</span><span style={{color:"#5D6D7E"}}> World</span></i> */}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} style={{width:'80%'}}>
        {/* <div class="input-grouplogin">
  <input required="" type="text" name="text" autocomplete="off" className="inputlogin"/>
  <label className="user-label">First Name</label>
</div> */}

<div class="inputlogin">
    <input type="text"  id="username" name="username"required autoFocus   value={userName}
            onChange={handleUsernameChange} />
    <label for="name">Email-Id</label>

</div>
<div class="inputlogin" style={{marginTop:'35px',display:'flex'}}>
    <input type={showPassword ? 'text' : 'password'}  id="password" name="password" required    value={Password}
            onChange={handlePasswordChange} />
    <label for="name">Password</label>
    <div className='icnbtn'
                   onClick={handleClickShowPassword}
                   onMouseDown={handleMouseDownPassword}
                  >
                   {showPassword ? <FaEyeSlash  style={{color:'white'}}/> : <FaEye style={{color:'white'}} />}
                  </div>
</div>
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email-Id"
            name="username"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={handleUsernameChange}
            style={{color:'white'}}
          /> */}
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={Password}
            onChange={handlePasswordChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                   aria-label="toggle password visibility"
                   onClick={handleClickShowPassword}
                   onMouseDown={handleMouseDownPassword}
                   edge="end"             
                  >
                   {showPassword ? <FaEyeSlash  style={{color:'white'}}/> : <FaEye style={{color:'white'}} />}
                  </IconButton>
                  </InputAdornment>,
               }}
          /> */}
      <button className='buttonlogin' type="submit" >
            Start Game <FaRegCirclePlay style={{height:'30px'}}/>
          </button>
        </Box>
      </Box>
    </Container>
    </div>
        </div>
          </div>
    </div>
    <div className='row' style={{textAlign:"center",fontSize:"9px",width:'100%'}}>      
      <span style={{color:'white',fontSize:"12px",marginLeft:'45%',width:'fit-content'}}><PiCopyrightThin style={{color:'white'}}/> 2024 Global Knowledge Technologies
      </span>
      </div>
    </div>
  );
};
export default LoginScreen;