import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLogin } from "../redux/actions/userActions";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { cookieContains } from "../lib/cookieContains";

function Login() {

  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector(state => state.userReducer);
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // localStorage.setItem('email', formData.email);
    Cookie.set('email', formData.email);
    dispatch(toggleLogin());
  }

  if (isUserLoggedIn) {
    router.push('/');
  }

  return(
    <form onSubmit={submitHandler}>
      <input 
        type="email"
        name="email"
        value={formData.email}
        onChange={changeHandler}
        placeholder="email"
        required
      /> <br /><br />
      
      <input 
        type="password"
        name="password"
        value={formData.password}
        onChange={changeHandler}
        placeholder="password"
        autoComplete="on"
        required
      /><br /><br />

      <button>Submit</button>
    </form>
  );
}

export async function getServerSideProps({ req, res }) {

  if (req.headers.cookie && cookieContains(req.headers.cookie)) {
    res.writeHead(302, { Location: '/' })
    res.end()
  }

  return { props: {} };
}

export default Login;