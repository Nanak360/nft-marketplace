import "../styles/globals.css";
import NavBar from "../Components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar></NavBar>
      <div className="h-24"></div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
