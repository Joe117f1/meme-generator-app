'use strict';

const saveToStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
};

const loadFromStorage = (key) => {
    const val = localStorage.getItem(key);
    return JSON.parse(val); 
};