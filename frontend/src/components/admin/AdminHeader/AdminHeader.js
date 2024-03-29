import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userimg from '../../../images/user.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { set_Authentication } from '../../../Redux/authentication/authenticationSlice';

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user);
  const user_basic_details = useSelector(state => state.user_basic_details);

  const logout = () => {
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: false
      })
    );
    navigate('/admincontrol/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to="/admincontrol">
            ADMIN
          </Link>
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown">
            <Link
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              to="#"
              role="button"
              id="navbarDropdownMenuAvatar"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={authentication_user.isAuthenticated && user_basic_details.profile_pic ? user_basic_details.profile_pic : userimg}
                className="rounded-circle"
                height="25"
                alt="Profile Pic"
                loading="lazy"
              />
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                {!authentication_user.isAuthenticated ?
                  <Link className="dropdown-item" to="/admincontrol/login">Login</Link> :
                  <button className="dropdown-item" onClick={logout}>Logout</button>
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default AdminHeader;
