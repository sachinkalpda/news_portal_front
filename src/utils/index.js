export * from './constants';

// setting token in local storage
export const setItemToLocalStorage = (key,value) => {
    if(!key || !value){
        console.error('Can not store to localstorage');
    }
    let valuToStore = typeof value !== 'string' ? JSON.stringify(value) : value;
    localStorage.setItem(key,valuToStore);
}

// getting token from localStorage
export const getItemFromLocalStorage = (key) => {
    if(!key){
        console.error('Can not get value from localstorage');
    }

    return localStorage.getItem(key);
}

// for removing token from localstorage
export const removeItemFromLocalStorage = (key) => {
    if(!key){
        console.error('Can not remove value from localstorage');
    }

    localStorage.removeItem(key);
}


export const getFormBody = (params) => {
    let formBody = [];
  
    for (let property in params) {
      let encodedKey = encodeURIComponent(property); 
      let encodedValue = encodeURIComponent(params[property]); 
  
      formBody.push(encodedKey + '=' + encodedValue);
    }
  
    return formBody.join('&'); // 'username=aakash&password=123213'
  };