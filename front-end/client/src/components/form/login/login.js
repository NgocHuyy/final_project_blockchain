import React, {useState, useEffect} from "react";
import cover from "../cover.png";

import getWeb3 from "../../../getWeb3";
import { useHistory} from "react-router-dom";

import axios from "axios";

export function Login(props) {
  var url = "http://localhost:5000/login";
  const history = useHistory()

  const getAccountsWeb3 = async ()=>{
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    setUseraddress(accounts[0]);
  }
  const [useraddress,setUseraddress] = useState();

  const [password,setPassword] = useState('');
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(()=>{
    console.log(useraddress)
    getAccountsWeb3();
  },[])

  useEffect(()=>{
    if(props.account){
      setUseraddress(props.account);
    }
  },[props.account])

  const handleSubmit = async (e)=>{
      try {
        e.preventDefault();
        setFormError(validate(useraddress, password))
        setIsSubmit(true);
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    console.log(formError)
    if(Object.keys(formError).length === 0 && isSubmit) {
      loginCall();
    }
  },[formError])

  const validate = (useraddress, password)=>{
    const err = {};
    // const regex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!useraddress){
      err.useraddress = "User Address is required";
    }
    if(!password){
      err.password = "Password is required";
    }
    return err;
  }


  const login = (value)=>{
    localStorage.setItem('accessToken', value);
    props.handleClickSuccess()
    history.replace("/")
  }

  const loginCall = async () => {
    try {
        const res = await axios.post('http://localhost:5000/auth/login', {
          userAddress: props.account,
          password: password,
        }).then(res =>{ 
          const person = res.data;
          console.log(person)
          login(JSON.stringify(person)); 
        });

      const user = await axios.patch(`http://localhost:5000/auth/updateStateUser/${props.account}`, {
        state: true
      }).then(res =>{ 
        const person = res.data;
        console.log(person)
      });
             
    } catch (err) {
       console.log("Đã xuất hiện lỗi vui lòng thực hiện lại 😓");
    }
  };

  return (
    <div className="base-container" ref={props.containerRef}>
          <div className="form-group">
              <label htmlFor="useraddress">User address</label>
              <input type="text" 
                name="useraddress" 
                placeholder="useraddress" 
                value={useraddress} 
                disabled
                required
              />
              <p className="validate--error">{formError.useraddress }</p>
            </div>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={cover} />
          </div>
          <div className="form">
            

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange = {(e)=>{setPassword(e.target.value)}}
                required
              />
              <p className="validate--error">{formError.password }</p>

            </div>

            <div className="form-group">
              <input className="submit" type="submit" value = "Login" onClick= {handleSubmit}/>
            </div>
          </div>
        </div>

      </div>
  )
}