import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { set_Authentication } from "../../../Redux/authentication/authenticationSlice";
import userimg from "../../../images/user.jpg";
// import 'bootstrap/dist/css/bootstrap.min.css';

function UserHeader() {
  const authentication_user = useSelector((state) => state.authentication_user);
  const user_basic_details = useSelector((state) => state.user_basic_details);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: false,
      })
    );
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#424242" }}>
      {/* <!-- Container wrapper --> */}
      <div className="container-fluid">
        {/* <!-- Toggle button --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
  
        {/* <!-- Collapsible wrapper --> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <!-- Navbar brand --> */}
          <Link style={{ color: "white" }} className="navbar-brand mt-2 mt-lg-0" to="/">
            LOGO
          </Link>
          
        </div>
        {/* <!-- Collapsible wrapper --> */}
  
        {/* <!-- Right elements --> */}
        <div className="d-flex align-items-center">
          {/* <!-- Login / Logout --> */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {!authentication_user.isAuthenticated ? (
                <Link className="nav-link" style={{ color: "white" }} to="/login">
                  Login
                </Link>
              ) : (
                <Link className="nav-link" style={{ color: "white" }} to="/profile">
                  My Profile
                </Link>
              )}
            </li>
          </ul>
  
          {/* <!-- Avatar --> */}
          <div>
            <Link to="/profile">
              <img
                src={
                  authentication_user.isAuthenticated && user_basic_details.profile_pic
                    ? user_basic_details.profile_pic
                    : userimg
                }
                className="rounded-circle"
                height="25"
                alt="User Avatar"
                loading="lazy"
                style={{ marginLeft: "10px" }} // Adjust the margin as needed
              />
            </Link>
          </div>
  
          {/* <!-- Logout button --> */}
          {authentication_user.isAuthenticated && (
            <button className="btn btn-link" style={{ color: "white" }} onClick={logout}>
              Logout
            </button>
          )}
        </div>
        {/* <!-- Right elements --> */}
      </div>
      {/* <!-- Container wrapper -->// */}
    </nav>
  );
          }  

export default UserHeader;
