import React from "react";
import { NavLink } from "react-router-dom";
import dateFormat from "dateformat";
import ArticleCard from "./ArticleCard";
function NewsSection(props) {
  return (
    <div className="my-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{props.title}</h2>
      </div>
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 my-4 py-3 border-b-4 border-slate-950">
        {props.articles.map((item) => (
          <ArticleCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default NewsSection;
