import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { set_Authentication } from '../../Redux/authentication/authenticationSlice'
import {jwtDecode} from 'jwt-decode'; 
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'

function UserLogin(){

  const { state } = useLocation();
  const[message, setMessage] = useState(null)
  const [formError, setFormError] = useState([])
  const baseURL = 'http://127.0.0.1:8000'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.authentication_user.isAuthenticated);


  useEffect(()=>{
    if(state){
      setMessage(state)
    }
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [state, navigate, isAuthenticated]);
  

  const HandleLoginSubmit = async(e)=>{
    e.preventDefault()
    setFormError([])
    const formData = new FormData();
    formData.append("email", e.target.email.value)
    formData.append("password", e.target.password.value)
    console.log(formData.password);

    try{
      const res = await axios.post(baseURL + '/api/users/login', formData)
      if(res && res.status === 200){
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        console.log(res.data)
        dispatch(
          set_Authentication({
            name:jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin:res.data.isAdmin
          })
         
        )
        navigate('/', { replace: true }); 
        return res
      }
    }
  
  catch(error){
    console.log(error)
    if(error.response && error.response.status === 401){
      setFormError(error.response.data)
    }
    else{
      console.log(error)
    }
  }
}

  return(
    <section style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 col-lg-5 col-xl-5">
              {message && <div class="alert alert-primary" role="alert" data-mdb-color="dark">
          {message}
          </div>}
            <div className="card" style={{ borderRadius: "0.5rem", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"   }}>
              <div className="card-body p-5">
                <h3 className="text-center mb-4"  style={{ fontSize: '2rem' }}>Login</h3>
                <form method="POST" onSubmit={HandleLoginSubmit}>
                  {/* Email input */}
                  <div className="mb-4">
                    <input type="email" name="email" id="form1Example13" className="form-control form-control-lg"  style={{ fontSize: '1rem' }} placeholder="Email address" />
                  </div>

                  {/* Password input */}
                  <div className="mb-4">
                    <input type="password" name="password" id="form1Example23" className="form-control form-control-lg"  style={{ fontSize: '1rem' }} placeholder="Password" />
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary btn-lg btn-block"  style={{ fontSize: '1rem' }}>Login in</button>

                  <ul className='text-danger'>
                    {formError['detail'] && <li>
                    {formError['detail']}
                      </li>}
                  </ul>
                </form>

                <div className="d-flex justify-content-around align-items-center mb-4">
           
           <Link to='/signup'>Not Have Account?</Link>
         </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserLogin