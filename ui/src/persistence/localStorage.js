function getItem(key) {
  try {
    const serializedItem = localStorage.getItem(key);

    return JSON.parse(serializedItem);
  } catch (error) {
    return false;
  }
}

function setItem(key, value) {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (error) {
    return false;
  }
}

function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    return false;
  }
}

export { getItem, setItem, removeItem };
