import { Fragment, useEffect, useState } from "react";
import "./loginpage.css";
import { CiLock, CiMail } from "react-icons/ci";
import ButtonLoader from "../loader/ButtonLoader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginUser } from "../actions/userActions";

import toast from "react-hot-toast";
const LoginPage = () => {
  const { error, isAuthenticatedUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate ();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const response = await handleLoginUser(user, dispatch);
      if (response) {
        navigate("/dashboard");
        toast.success("Logged in successfully", {
          icon: "✅",
        });
      }
    } catch (error) {
      setDisabled(false);
      toast.error(error.message);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (isAuthenticatedUser) {
      navigate("/dashboard");
    }
   
  }, [ isAuthenticatedUser, dispatch, navigate]);
  return (
    <Fragment>
      <div className="login__signUp__container">
        <div className="login__signUp__box">
          <div>
            <div className="login__signUp__toggle">
              <p>LOGIN</p>
            </div>
          </div>
          <form className="login__form" onSubmit={loginSubmit}>
            <div className="login__email">
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
              <Link to="/"> Don't have an account ?</Link>
            </div>

            <button disabled={disabled} type="submit" className="login__btn">
              {disabled ? <ButtonLoader /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
