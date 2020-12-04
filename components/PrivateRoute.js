import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function PrivateRoute(WrappedComponent) {
  function Wrapper() {

    const { isUserLoggedIn } = useSelector(state => state.userReducer);
    // const router = useRouter();

    // useEffect(() => {
    //   if (!isUserLoggedIn)
    //     router.push('/login');
    // }, [isUserLoggedIn]);
      
    
    return (
      <WrappedComponent />
    );
  }

  Wrapper.getInitialProps = async (ctx) => {
    if (typeof window === 'undefined' && ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    return {};
  }

  return Wrapper;
}