import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import dateFormat from "dateformat";

import { BsBookmarkPlus, BsBookmarkDash } from "react-icons/bs";
import { MdBookmarkAdded } from "react-icons/md";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

function ArticleCard({ item, isSaved }) {
  const [saved, setSaved] = useState(isSaved ? isSaved : false);
  
  const auth = useAuth();
  const [login, setLogin] = useState((auth.user));


  const handleSaveArticle = async (item) => {
    const response = await auth.saveArticle(
      item.article_id,
      item.title,
      item.link,
      item.pubDate,
      item.image_url,
      item.category[0],
      item.creator
    );

    if (response.success) {
      setSaved(true);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleRemoveArticle = async (item) => {
    const response = await auth.removeArticle(item._id);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="shadow-lg p-4 rounded-sm">
      <NavLink to={item.link} target="_blank">
        <img
          src={item.image_url}
          className="object-cover w-full max-h-[300px] md:h-48"
          alt="Image Not Found"
        />
      </NavLink>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm text-red-700 py-3 capitalize">
            {item.category[0]}
          </p>
          {(login) ? isSaved ? (
            <span
              className="flex items-center cursor-pointer hover:underline text-sm"
              onClick={() => handleRemoveArticle(item)}
            >
              <BsBookmarkDash color="blue" />

              <span className="ml-1">Remove</span>
            </span>
          ) : (
            <span
              className="flex items-center cursor-pointer hover:underline text-sm"
              onClick={() => handleSaveArticle(item)}
            >
              {saved ? (
                <MdBookmarkAdded color="blue" />
              ) : (
                <BsBookmarkPlus color="blue" />
              )}

              <span className="ml-1">{saved ? "Saved" : "Save Article"}</span>
            </span>
          ): ''}
        </div>
        <NavLink to={item.link} target="_blank">
          <h2 className="font-bold text-xl hover:text-red-700 line-clamp-2">
            {item.title}
          </h2>
        </NavLink>
        <p className="text-md font-md my-5">
          <span className="font-bold">By </span>
          <span className="hover:text-red-700">
            {item.creator ? item.creator : "N/A"}
          </span>
        </p>
        <p className="text-md font-md my-2">
          <span className="font-bold text-sm">Published On</span>{" "}
          <span className="hover:text-red-700 text-sm">
            {dateFormat(item.pubDate, "mmmm dS, yyyy")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;
