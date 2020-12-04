import { useSelector, useDispatch } from "react-redux";
import styles from '../styles/Home.module.css';
import { toggleLogin } from "../redux/actions/userActions";
import { cookieContains } from "../lib/cookieContains";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Error from "next/error";

function Dashboard() {

  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector(state => state.userReducer);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('email');
    dispatch(toggleLogin());
  }

  if (!isUserLoggedIn && typeof window !== 'undefined') {
    router.push('/login');
  }

  return (
    <div className={styles.container}>
      <h1>This is Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {

  if (req.headers.cookie && !cookieContains(req.headers.cookie)) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  }

  return { props: {} };
}

export default Dashboard;