import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Recommendations from "../components/Recommendations";
import Error from "../components/Error";
import { TailSpin } from "react-loader-spinner";

export default function Home() {
  const [animeRecommendation, setAnimeRecommendation] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const animeRecommendationFetch = await fetch(
          "https://api.jikan.moe/v4/recommendations/anime"
        );
        if (animeRecommendationFetch.ok) {
          const jsonAnimeRecommendation = await animeRecommendationFetch.json();
          setAnimeRecommendation(jsonAnimeRecommendation.data);
          setIsLoading(false);
        }
        if (
          animeRecommendationFetch.status >= 400 &&
          animeRecommendationFetch.status <= 499
        ) {
          setIsError(true);
        }
        if (
          animeRecommendationFetch.status >= 500 &&
          animeRecommendationFetch.status <= 599
        ) {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderPage = () => {
    if (isError) {
      return <Error></Error>;
    }
    if (isLoading) {
      return (
        <TailSpin
          height="100"
          width="100"
          color="#ff8e3c"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperClass="loader"
          visible={true}
        />
      );
    }
    return (
      <Recommendations recommendations={animeRecommendation}></Recommendations>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Anime Recommendations</title>
      </Head>
      {renderPage()}
    </div>
  );
}
