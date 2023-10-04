import { useState } from 'react';
import { Checkbox } from '@mui/material';
import{ FormControlLabel} from '@mui/material';
import { signup, login } from '../api/api';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isButtonClicked){
        signup({"username":username,"password":password})
    }else{
        login({"username":username,"password":password})

        
    }
   };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <FormControlLabel control={<Checkbox onClick={handleClick} />} label="Signup" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


