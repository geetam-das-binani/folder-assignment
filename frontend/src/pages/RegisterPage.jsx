import React, { Fragment, useEffect, useState } from "react";
import "./registerpage.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonLoader from "../loader/ButtonLoader";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
;
import toast from "react-hot-toast";
import { handleRegisterUser } from "../actions/userActions";
const RegisterPage = () => {
  const {  isAuthenticatedUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const response = await handleRegisterUser(user, dispatch);
      if (response) {
        navigate("/dashboard");
        toast.success("Registered successfully",{
          icon:"✅"
        });
      }
    } catch (error) {
      setDisabled(false);
      toast.error(error.message);
    } finally {
      setDisabled(false);
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
   

    if (isAuthenticatedUser) {
      navigate("/dashboard");
    }
  }, [isAuthenticatedUser, dispatch, navigate]);
  return (
    <Fragment>
      <div className="login__signUp__container">
        <div className="login__signUp__box">
          <div className="login__signUp__toggle">
            <p>REGISTER</p>
          </div>
          <form className="login__form" onSubmit={registerSubmit}>
            <div className="login__name">
              <CiUser />
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="login__name">
              <CiMail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="login__password">
              <CiLock />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <div className="login__actions">
              <Link to="/login">Already have an account ?</Link>
            </div>

            <button disabled={disabled} type="submit" className="login__btn">
              {disabled ? <ButtonLoader /> : "Register"}
            </button>
          </form>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </Fragment>
  );
};

export default RegisterPage;
