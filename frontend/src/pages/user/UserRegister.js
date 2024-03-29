import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserRegister() {

  const [formError, setFormError] = useState({});
  const baseURL = 'http://127.0.0.1:8000';
  const navigate = useNavigate();

  const validateForm = (formData) => {
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

  const HandleRegisterForm = async (event) => {
    event.preventDefault();
    setFormError({}); // Clear previous errors
    const formData = {
      first_name: event.target.first_name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      phone_number: event.target.phone_number.value,
    };

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    try {
      const res = await axios.post(baseURL + '/api/users/register/', formData);
      console.log(res);

      if (res.status === 201) {
        navigate('/login', {
          state: res.data.Message,
        });
        return res;
      }
    } catch (error) {
      if (error.response.status === 406) {
        console.log("error");
        console.log(error.response.data);
        setFormError(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <section style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow" style={{ borderRadius: '1rem', border: 'none' }}>
              <div className="card-body p-5">

                <h3 className="mb-5 text-center" style={{ fontSize: '2rem' }}>Register  </h3>
                <form method='POST' onSubmit={HandleRegisterForm}>

                  <div className="mb-4">
                    <input type="text" name='first_name' className="form-control form-control-lg" style={{ fontSize: '1.1rem' }} placeholder="Name" required />
                    {formError.first_name && formError.first_name.map((error, index) => (
                      <div key={index} className="text-danger">{error}</div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <input type="email" id="typeEmailX-2" name='email' className="form-control form-control-lg" style={{ fontSize: '1.1rem' }} placeholder="Email" required />
                    {formError.email && formError.email.map((error, index) => (
                      <div key={index} className="text-danger">{error}</div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <input type="text" className="form-control form-control-lg" name='phone_number' style={{ fontSize: '1.1rem' }} placeholder="Mobile Number" required />
                    {formError.phone_number && formError.phone_number.map((error, index) => (
                      <div key={index} className="text-danger">{error}</div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" style={{ fontSize: '1.1rem' }} name='password' placeholder="Password" required />
                    {formError.password && formError.password.map((error, index) => (
                      <div key={index} className="text-danger">{error}</div>
                    ))}
                  </div>

                  <button className="btn btn-primary btn-lg btn-block" style={{ fontSize: '1.1rem' }} type="submit">Register Now</button>
                </form>

                <hr className="my-4" />

                <p className="text-center mb-0" style={{ fontSize: '1rem' }}> Already Have An Account?<Link to='/login'> Login</Link></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserRegister;
