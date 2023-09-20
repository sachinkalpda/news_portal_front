import React, { useEffect, useState } from "react";
import NewsSection from "../components/NewsSection";
import { getSuggestedArticle, getTopHeadlines } from "../api";
import Loader from "../components/Loader";
function Home() {
  const [suggestedArticles, setSuggestedArticles] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getSuggestion = async () => {
      // getting articles according to user's saved preferences
      const response = await getSuggestedArticle();
      if(response.success){
        setSuggestedArticles(response.data);
      }
      
    }
    getSuggestion();
    setLoading(false);
  },[]);


  if(loading){
    return <Loader />
  }
  return (
    <div>
      <NewsSection title={"Top News For You"} articles={suggestedArticles}/>
    </div>
  );
}

export default Home;
