import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getArticlesByCategory } from "../api";
import Loader from "../components/Loader";
import dateFormat from "dateformat";
import ArticleCard from "../components/ArticleCard";
function Category() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const getArticles = async () => {
      // getting articles by category name
      const response = await getArticlesByCategory(category);
      // console.log(response);
      if (response.success) {
        setArticles(response.data.results);
      }
      setLoading(false);
    };
    getArticles();
  }, [category]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="">
      <p className="text-sm text-gray-400 my-3">
        <NavLink to="/">
          <span className="underline hover:text-red-700">Home</span>
        </NavLink>
        / <span className="capitalize">{category}</span>
      </p>
      <h2 className="font-bold text-3xl text-center py-3 my-3 capitalize">
        {category}
      </h2>

      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 my-4 py-3 ">
        {articles.length === 0 && <p>No Articles Found!</p>}

        {articles.map((item) => (
          <ArticleCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Category;
