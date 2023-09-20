// base route
const API_ROOT = 'http://localhost:8000/api/v1/';

export const API_URLS = {
  login: () => `${API_ROOT}/user/login`,
  register: () => `${API_ROOT}/user/register`,
  profile : () => `${API_ROOT}/user/profile`,

  userSaveInterest : () => `${API_ROOT}/user/save-interest`,
  userRemoveInterest : () => `${API_ROOT}/user/remove-interest`,

  getCategories : () => `${API_ROOT}/category/all`,

  getArticlesByCategory : (category) => `${API_ROOT}/articles/category/${category}`,

  getSuggestedArticle : () => `${API_ROOT}/articles/suggested`,

  getTopHeadlines : () => `${API_ROOT}/articles/headlines`,

  saveArticle : () => `${API_ROOT}/user/save-article`,

  removeArticle : () => `${API_ROOT}/user/remove-article`,

  searchArticle : () => `${API_ROOT}/search?keyword=${keyword}`
  
};

export const LOCALSTORAGE_TOKEN_KEY = '__news_portal_token__';
