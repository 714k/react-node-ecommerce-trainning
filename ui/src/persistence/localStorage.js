function getLocalStorage(key) {
  try {
    const serializedItem = localStorage.getItem(key);

    return JSON.parse(serializedItem);
  } catch (error) {
    return false;
  }
}

function setLocalStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (error) {
    return false;
  }
}

export { getLocalStorage, setLocalStorage };
