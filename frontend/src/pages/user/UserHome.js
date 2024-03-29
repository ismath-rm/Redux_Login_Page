import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'



function UserHome() {
  const navigate = useNavigate()
  const authentication_user = useSelector(state=>state.authentication_user)

  return (
<div className="row my-4 mx-4">
  <div className="col-md-6 mb-4">
    <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
      <img src="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg" className="img-fluid" />
      <a href="#!">
        <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
      </a>
    </div>
  </div>

  <div className="col-md-6 mb-4">
    <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">{authentication_user.isAuthenticated?<>Welcome Back {authentication_user.name} ! </>:<>Hello Guest User</>}</span>
    <h4><strong>Home Page </strong></h4>
    <p className="text-muted">
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Et perferendis libero rem quo nostrum sed molestias, unde dolore ipsa natus!
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex error magnam maxime soluta pariatur et libero corporis nesciunt doloribus eligendi!
     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium odit ut tempore alias iusto sit, non dolorem laborum ad, eligendi quas, ullam itaque! Eos, quidem.
    </p>
    {authentication_user.isAuthenticated?<>
      <Link type="button" className="btn btn-primary" to='/profile'>Go To Profile  ! </Link></>
      :<><Link type="button" className="btn btn-primary" to='/login'> Login</Link></>}
    

        

    
   
  </div>
</div>

  )
}

export default UserHome