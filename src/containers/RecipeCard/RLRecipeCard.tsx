/* eslint-disable no-undef */
import React from 'react';
import './RLRecipeCard.css';
import Button from 'react-bootstrap/Button';

interface RecipeCardProp {
  title: string;
  calories: number;
  image: any;
  ingredients: any;
  mealType: string;
  cuisineType: string;
  dish: string;
  dietLabels: string;
}
const RecipeCard: React.FC<RecipeCardProp> = ({
  title,
  calories,
  image,
  ingredients,
  mealType,
  cuisineType,
  dish,
  dietLabels
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const handleCopyClick = (text: string) => {
    copyTextToClipboard(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(() => {});
  };
  const value = ingredients.map((ingredient: any) => {
    return ingredient.text;
  });

  return (
    <div className="recipe">
      <h1>{title}</h1>
      <p>Calories: {Math.floor(calories)}g</p>
      <p>MealType: {mealType}</p>
      <p>Diet: {dietLabels}</p>
      <p>Dish: {dish}</p>
      <p>country: {cuisineType}</p>
      <img src={image} alt="" />
      <ul className="ingredient-list">
        {ingredients.map((ingredient: any, idx: any) => (
          <li className="lead" key={idx}>
            {ingredient.text}
          </li>
        ))}
      </ul>
      <Button
        onClick={() => handleCopyClick(value)}
        variant="secondary"
        size="sm"
      >
        {isCopied ? 'copied!' : 'copyRecipe'}
      </Button>
      <br />
      <br />
    </div>
  );
};

export default RecipeCard;
