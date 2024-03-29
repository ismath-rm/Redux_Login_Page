import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminCreateUser() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState([]);
  const baseURL = "http://127.0.0.1:8000";
  const [formData, setFormData] = useState({
    first_name: '',
    phone_number: '',
    email: '',
    password:'',
    profile_pic: null,  
  });

  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!formData.first_name.trim()) {
      errors.first_name = ['First name is required'];
    } else if (!/^[A-Za-z]+$/.test(formData.first_name.trim())) {
      errors.first_name = ['First name must contain only letters'];
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = ['Email is required'];
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = ['Invalid email format'];
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone_number.trim()) {
      errors.phone_number = ['Phone number is required'];
    } else if (!phoneRegex.test(formData.phone_number.trim())) {
      errors.phone_number = ['Invalid phone number'];
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = ['Password is required'];
    } else if (formData.password.trim().length < 4) {
      errors.password = ['Password must be at least 4 characters long'];
    }

    return errors;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      profile_pic: file,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      const { profile_pic, ...userData } = formData;
      const userDataWithProfilePic = new FormData();

      userDataWithProfilePic.append('UserProfile.profile_pic', profile_pic);

      Object.keys(userData).forEach((key) => {
        userDataWithProfilePic.append(key, userData[key]);
      });

      axios.post(baseURL+'/api/users/admin/users/', userDataWithProfilePic,{
        headers: {
          'Content-Type': 'multipart/form-data', 
        }
      })
      .then(response => {
        navigate('/admincontrol');
      })
      .catch(error => {
        console.error('Error creating user:', error);
        if (error.response.status===400) {
          setFormError(error.response.data);
        } else {
          console.log(error);
        }
      });
    } else {
      setFormError(errors);
    }
  };

  return (
    <section style={{backgroundColor: "grey"}}>
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
              <div className="card-body p-5 ">
                <h3 className="mb-5 text-center">Create New User</h3>
                <form onSubmit={handleSubmit} method='POST'>
                  <div className=" mb-4">
                    <input type="text" name='first_name' className="form-control form-control-lg" required onChange={handleInputChange}/>
                    <label className="form-label" >Name</label>
                  </div>
                  <div className=" mb-4">
                    <input type="email" id="typeEmailX-2" name='email' className="form-control form-control-lg"  required onChange={handleInputChange}/>
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                  </div>
                  <div className=" mb-4">
                    <input type="text"  className="form-control form-control-lg"  name='phone_number' required onChange={handleInputChange}/>
                    <label className="form-label" >Mobile Number</label>
                  </div>
                  <div className=" mb-4">
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name='password' required onChange={handleInputChange}/>
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  </div>
                  <div className=" mb-4">
                    <input type="file"  className="form-control form-control-lg" name='profile_pic' required onChange={handleFileChange}/>
                    <label className="form-label" htmlFor="typePasswordX-2">Profile Picture</label>
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Create Now</button>
                </form>
                <ul className='text-danger'>
                  {Object.keys(formError).map((key) => (
                    formError[key].map((message, index) => (
                      <li key={`${key}_${index}`}>{message}</li>
                    ))
                  ))}
                </ul>
                <hr className="my-4"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminCreateUser;
