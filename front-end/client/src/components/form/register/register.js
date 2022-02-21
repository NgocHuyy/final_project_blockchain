import React, {useState, useEffect} from 'react';
import loginImg from "../login.svg";
import cover from "../cover.png";
import axios from "axios";

export function Register(props){

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [useraddress,setUserAddress] = useState(props.account);

  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e)=>{
      try {
        e.preventDefault();
        setFormError(validate(useraddress, password, email))
        setIsSubmit(true);

      } catch (error) {
        console.log(error);
      }
  }
  useEffect(() => {
    setIsSubmit(false);
  },[])
  
  useEffect(() => {
    console.log(formError)
    if(Object.keys(formError).length === 0 && isSubmit) {
      registerall();
    }
  },[formError])

  const validate = (useraddress, password,email)=>{
    const err = {};
    const regex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!useraddress){
      err.useraddress = "User Address is required";
    }
    if(!password){
      err.password = "Password is required";
    }else if(password.length < 6){
      err.password = "Password must be more than 6 characters";
    }

    if(!email){
      err.email = "Password is required";
    }else if(!regex.test(email)){
      err.email = "This is not a valid email format";
    }
    return err;
  }

  const registerall = async () => {
    try {
        const res = await axios.post('http://localhost:5000/auth/register', {
          userAddress: useraddress,
          password: password,
          email: email
        });

      } catch (err) {
        console.log("Đã xuất hiện lỗi vui lòng thực hiện lại 😓");
      }
  };
  return (
    <div className="base-container" ref={props.containerRef}>
    <div className="form-group">
              <label htmlFor="useraddress">User address</label>
              <input type="text" name="useraddress" placeholder="useraddress" value= {useraddress} disabled/>
              <p className="validate--error">{formError.useraddress }</p>

            </div>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={cover} />
          </div>

          <div className="form">
            

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                name="email" 
                placeholder="Email" 
                onChange = {(e)=>{setEmail(e.target.value)}}
                required/>
              <p className="validate--error">{formError.email }</p>

            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange = {(e)=>{setPassword(e.target.value)}}
                required/>
              <p className="validate--error">{formError.password }</p>

            </div>
            
            <div className="form-group">
              <input type="submit" value = "Register" onClick={handleSubmit}/>
            </div>
          </div>
        </div>
      </div>
  )
} 
