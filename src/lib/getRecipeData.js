import axios from 'axios';

const getRecipeInfo = async (query) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`
    );
    const { data } = response;
    return data;
  } catch (error) {}
};
export const clearConsole = () => {
  // eslint-disable-next-line no-undef
  if (window.console || window.console.firebug) {
    console.clear();
  }
};

export default getRecipeInfo;
