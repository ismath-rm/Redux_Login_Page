import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import userimg from "../../images/user.jpg";

function AdminUpdateUser() {
  const baseURL = "http://127.0.0.1:8000";
  const { id } = useParams();
  const [formError, setFormError] = useState({});
  const [userData, setUserData] = useState({
    first_name: '',
    phone_number: '',
    email: '',
    is_active: true
  });

  useEffect(() => {
    axios.get(baseURL + `/api/users/admin/users/${id}/`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        navigate('/admincontrol');
      });
  }, [id]);

  const handleInputChange = event => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setUserData(prevData => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setUserData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!userData.first_name.trim()) {
      errors.first_name = ['First name is required'];
    } else if (!/^[A-Za-z]+$/.test(userData.first_name.trim())) {
      errors.first_name = ['First name must contain only letters'];
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      errors.email = ['Email is required'];
    } else if (!emailRegex.test(userData.email.trim())) {
      errors.email = ['Invalid email format'];
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!userData.phone_number.trim()) {
      errors.phone_number = ['Phone number is required'];
    } else if (!phoneRegex.test(userData.phone_number.trim())) {
      errors.phone_number = ['Invalid phone number'];
    }

    return errors;
  };

  const handleSubmit = event => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      axios.put(baseURL + `/api/users/admin/users/update/${id}/`, userData)
        .then(response => {
          navigate('/admincontrol');
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    } else {
      setFormError(errors);
    }
  };

  const handleDelete = () => {
    axios.delete(baseURL + `/api/users/admin/users/delete/${id}/`)
      .then(response => {
        navigate('/admincontrol');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <section style={{ backgroundColor: "grey" }}>
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5">
                <img
                  src={userData.User_Profile ? userData.User_Profile.profile_pic : userimg}
                  className="rounded-circle"
                  alt=""
                  style={{ width: "80px", height: "80px" }}
                />
                <h3 className="mb-5 text-center">Update {userData.first_name}</h3>
                <form onSubmit={handleSubmit} method='POST'>
                  <div className=" mb-4">
                    <input type="text" name='first_name' value={userData.first_name} className="form-control form-control-lg" required onChange={handleInputChange} />
                    <label className="form-label" >Name</label>
                    {formError.first_name && <span className="text-danger">{formError.first_name}</span>}
                  </div>
                  <div className=" mb-4">
                    <input type="email" id="typeEmailX-2" name='email' value={userData.email} className="form-control form-control-lg" required onChange={handleInputChange} />
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                    {formError.email && <span className="text-danger">{formError.email}</span>}
                  </div>
                  <div className=" mb-4">
                    <input type="text" className="form-control form-control-lg" value={userData.phone_number} name='phone_number' required onChange={handleInputChange} />
                    <label className="form-label" >Mobile Number</label>
                    {formError.phone_number && <span className="text-danger">{formError.phone_number}</span>}
                  </div>
                  <div className=" mb-4">
                    <input type="checkbox" name="is_active" checked={userData.is_active} onChange={handleInputChange} />
                    <label className="form-label" htmlFor="typePasswordX-2">Active Status</label>
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Update Now</button>
                </form>
                <button className="btn btn-danger btn-lg btn-block my-2" type="button" onClick={handleDelete}>Delete This User</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminUpdateUser;
