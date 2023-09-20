import {API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";

const customFetch = async (url, {body, ...customConfig}) => {
    // getting token from localStorage if exists
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    
    // setting request header
    const headers = {
        'content-type' : 'application/x-www-form-urlencoded',
    }
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...customConfig,
        headers : {
            ...headers,
            ...customConfig.headers
        }

    }

    if(body){
        config.body = getFormBody(body);
    }

    try {
        const response = await fetch(url,config);
        // console.log(response);
        const data = await response.json();
        console.log(data,"data");
        if(data.success){
            return {
                ...data,
                success : true
            }
        }

        return {
            ...data,
            success : false
        }

        // throw new Error(data.message);
        
    } catch (error) {
        console.error(error);
        return {
            message : error,
            success : false
        }
    }
}

// method for new user registration
export const register = (name, email, password) => {
    return customFetch(API_URLS.register(), {
        method : "POST",
        body : {name,email,password}
    })
}
// method for user' login
export const login = (email, password) => {
    return customFetch(API_URLS.login(), {
        method : 'POST',
        body : {email,password}
    })
}
// method for getting logged in user profile information
export const profile = () => {
    return customFetch(API_URLS.profile(), {
        method : 'GET',
    })
}

// method for getting all available categories
export const getCategories = () => {
    return customFetch(API_URLS.getCategories(), {
        method : 'GET'
    })
}

// method for saving a new category in user's interest
export const saveUserInterest = (category) => {
    return customFetch(API_URLS.userSaveInterest(),{
        method : 'POST',
        body : {category}
    })
}

// method for removing a category from user's interest
export const removeUserInterest = (category) => {
    return customFetch(API_URLS.userRemoveInterest(),{
        method : 'POST',
        body : {category}
    })
}

// method for getting articles filter by category
export const getArticlesByCategory = (category) => {
    return customFetch(API_URLS.getArticlesByCategory(category),{
        method : 'GET',
    })
}

// method for getting suggested article
export const getSuggestedArticle = () => {
    return customFetch(API_URLS.getSuggestedArticle(),{
        method : "GET"
    });
}


// method for saving article
export const saveUserArticle = (article_id,title,link,pubDate,image_url,category,creator) => {
    return customFetch(API_URLS.saveArticle(),{
        method : 'POST',
        body : {article_id,title,link,pubDate,image_url,category,creator}
    })
}

// method for removing article

export const removeUserArticle = (article_id) => {
    return customFetch(API_URLS.removeArticle(),{
        method : "POST",
        body : {article_id}
    });
}

export const searchArticles = () => {
    return customFetch(API_URLS.search(),{
        method : "GET",
    });
}