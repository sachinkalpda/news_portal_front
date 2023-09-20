import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers";
import jwt from "jwt-decode";
import {
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from "../utils";
import {
  login as UserLogin,
  register as userRegister,
  removeUserInterest,
  saveUserInterest,
  saveUserArticle,
  removeUserArticle,
} from "../api";

export const useAuth = () => {
  return useContext(AuthContext);
};

// auth provider

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // function for getting user information from token
  const getUser = async () => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const user = jwt(userToken);
      console.log(user);
      setUser({
        ...user,
        interests: user.interests,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  // register new user method
  const register = async (name, email, password) => {
    const response = await userRegister(name, email, password);

    if (response.success) {
      return {
        success: true,
        message: response.message,
      };
    }
    return {
      success: false,
      message: response.message,
    };
  };

  // user login function
  const login = async (email, password) => {
    const response = await UserLogin(email, password);
    // console.log(response);
    if (response.success) {
      // setUser(response.data.user);
      setItemToLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      getUser();
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // logout function

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  // saving user interests function
  const saveInterest = async (category) => {
    const response = await saveUserInterest(category);
    if (response.success) {
      setItemToLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      getUser();
      return {
        success: true,
        message: response.message,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // remove user interests function
  const removeInterest = async (category) => {
    const response = await removeUserInterest(category);
    if (response.success) {
      setItemToLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      getUser();
      return {
        success: true,
        message: response.message,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const saveArticle = async (
    article_id,
    title,
    link,
    pubDate,
    image_url,
    category,
    creator
  ) => {
    const response = await saveUserArticle(
      article_id,
      title,
      link,
      pubDate,
      image_url,
      category,
      creator
    );
    if (response.success) {
      setItemToLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      getUser();
      return {
        success: true,
        message: response.message,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const removeArticle = async (article_id) => {
    const response = await removeUserArticle(article_id);
    if (response.success) {
      setItemToLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      getUser();
      return {
        success: true,
        message: response.message,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  return {
    user,
    login,
    register,
    logout,
    loading,
    saveInterest,
    removeInterest,
    saveArticle,
    removeArticle
  };
};
