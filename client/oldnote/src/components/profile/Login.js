import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login({logged,setLog,baseURL,username,setUsername}) {

    const [pass, setPass] = useState(false);
    const [password, setPassword] = useState('');
    const [userError, setUerror] = useState('');
    const [passError, setPerror] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (event) =>{
        event.preventDefault();

        const response = await fetch(baseURL+'api/login', {
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    username:username,
                    password:password
                }
            )
        })

        const data = await response.json();
        console.log(data)
        if(data.success)
            {
                setLog(true);
                localStorage.setItem('predetail',JSON.stringify({username:username,logged:true,baseURL:baseURL}));
                navigate('/Profile');
            }
        else{
            if(data.message == 'Invalid-U'){
                    setUerror("* user does not exist")
                }
            if(data.message == 'Invalid-P'){
                    setPerror("* wrong Password, Try Again")
                }
        }
    }

    const handleSignUp = () => {
      navigate('/SignUp');
    };
  return (
    <div>
      <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
            <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <div className='error-pop'>{userError}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={pass?"text":"password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <input
                    id="check"
                    type="checkbox"
                    value={pass}
                    onChange={() =>
                        setPass((prev) => !prev)
                    }
                    />
                    <div className='error-pop'>{passError}</div>
                </div>
                <div className="form-buttons">
                    <button type="submit" className="login-button">Login</button>
                    <button type="button" className="signup-button" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login