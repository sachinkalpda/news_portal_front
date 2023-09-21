import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { MdBookmarkAdded } from "react-icons/md";
import { BsBookmarkPlus } from "react-icons/bs";
import { toast } from "react-toastify";

import { useAuth } from "../hooks";
import { getCategories, profile } from "../api";
import Loader from "../components/Loader";
import ArticleCard from "../components/ArticleCard";

function Profile() {
  const [categories, setCategories] = useState([]);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [loader, setLoader] = useState(true);
  const [savedArticles, setSavedArticles] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    const fetchCategories = async function () {
      const result = [];
      // getting all available categories 
      const response = await getCategories();

      const profileResponse = await profile();
      if(profileResponse.success){
        setSavedArticles(profileResponse.saved);
      }

      // getting user's saved intests
      const interests = auth.user.interests;
      // marking each category wheather the are saved to user's preference or not
      response.categories.forEach((item) => {
        let obj = {
          id: item._id,
          name: item.name,
          selected: false,
        };
        if (interests.includes(item._id)) {
          obj["selected"] = true;
        }
        result.push(obj);
      });
      setCategories(result);
    };
    fetchCategories();
    setLoader(false);
  }, [categories]);


  // function for handle adding user' s interest
  const addInterest = async (category) => {
    setRequestInProgress(true);
    const response = await auth.saveInterest(category);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setRequestInProgress(false);
  };

  // function for handle removing user's interest
  const removeInterest = async (category) => {
    setRequestInProgress(true);
    const response = await auth.removeInterest(category);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setRequestInProgress(false);
  };

  if(!auth.user){
    <Navigate to='/' />
  }
  if(loader){
    return <Loader />
  }

  return (
    <div>
      <p className="text-sm text-gray-400 my-3">
        <NavLink to="/">
          <span className="underline hover:text-red-700">Home</span>
        </NavLink>
        / Profile
      </p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 py-3">
        <div className="col-span-1">
          <h2 className="font-bold text-2xl py-2 mb-4">My Preference</h2>
          <div className="flex flex-col font-semibold">
            {categories.map((item) => (
              <div
                className={
                  item.selected
                    ? "flex justify-between items-center p-3 border-1 border-gray-500 rounded-sm cursor-pointer bg-green-300"
                    : "disabled flex justify-between items-center p-3 border-1 border-gray-500 rounded-sm cursor-pointer"
                }
                key={item._id}
              >
                <span>{item.name}</span>
                {item.selected ? (
                  <MdBookmarkAdded
                    size={24}
                    color="blue"
                    title="Remove Interest"
                    onClick={() => removeInterest(item.id)}
                    className=""
                    
                  />
                ) : (
                  <BsBookmarkPlus
                    size={24}
                    color="green"
                    title="Add Interest"
                    onClick={() => addInterest(item.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3">
          <h2 className="font-bold text-2xl py-2 mb-4">Saved Articles</h2>
          <div className="flex flex-col">
                {
                  (savedArticles.length == 0) && <h3>No Article Found!</h3>
                }

            {savedArticles.map((item) =>(
              <ArticleCard item={item} isSaved={true} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
