import "../styles/globals.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <div className="body_container">
      <Header></Header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
