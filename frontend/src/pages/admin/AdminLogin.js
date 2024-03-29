import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';





function AdminLogin() {
  const [formError, setFormError] = useState([])
  const baseURL='http://127.0.0.1:8000'
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.authentication_user.isAuthenticated);

  useEffect(() => {
    
    if (isAuthenticated) {
      navigate('/admincontrol');
    }
  }, [isAuthenticated, navigate]);
  

  const handleLoginSubmit = async(event)=> {
    event.preventDefault();
    setFormError([])
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    try {
      const res = await axios.post(baseURL+'/api/users/login', formData)
      if(res.status === 200){
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin:res.data.isAdmin,
          })
        );
        navigate('/admincontrol')
        return res
      }  
      
    }
    catch (error) {
      console.log(error);
      if (error.response.status===401)
      {
       
        setFormError(error.response.data)
      }
      else
      {
        console.log(error);
  
      }
    }
  }





  return (
<section>
  <div className="container py-5">
    <div className="row d-flex align-items-center justify-content-center">
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <div className="form-container p-4 border rounded shadow">
          <h2 className="mb-4 text-center">Admin Login In</h2> {/* Added heading */}
          <form method='POST' onSubmit={handleLoginSubmit} className="needs-validation">
            {/* Email input */}
            <div className="form-group mb-4">
              <input 
                type="email" 
                name='email' 
                id="form1Example13" 
                className="form-control form-control-lg" 
                required 
              />
              <label className="form-label" htmlFor="form1Example13">Email address</label>
              <div className="invalid-feedback">Please enter a valid email.</div>
            </div>

            {/* Password input */}
            <div className="form-group mb-4">
              <input 
                type="password" 
                name='password' 
                id="form1Example23" 
                className="form-control form-control-lg" 
                required 
              />
              <label className="form-label" htmlFor="form1Example23">Password</label>
              <div className="invalid-feedback">Please enter your password.</div>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-lg btn-block">Login in</button>

            {/* Error message */}
            <div className="text-danger mt-2">
              {formError['detail'] && <p>{formError['detail']}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

  
  )
}

export default AdminLogin