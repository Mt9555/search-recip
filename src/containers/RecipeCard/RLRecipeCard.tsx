/* eslint-disable no-undef */
import React from 'react';
import './RLRecipeCard.css';
import Button from 'react-bootstrap/Button';
import { v4 as uuid } from 'uuid';
interface RecipeCardProp {
  title: string;
  calories: number;
  image: any;
  ingredients: string[];
  mealType: string;
  cuisineType: string;
  dish: string;
  dietLabels: string;
  nutritions: Array<string>;
}
const RecipeCard: React.FC<RecipeCardProp> = ({
  title,
  calories,
  image,
  ingredients,
  mealType,
  cuisineType,
  dish,
  dietLabels,
  nutritions
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const onCopyHandler = (text: string) => {
    copyTextToClipboard(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch(() => {});
  };

  const recipe = ingredients.map((ingredient: any) => {
    return ingredient.text;
  });

  return (
    <>
      <h2>{title}</h2>
      <p>calories: {Math.floor(calories)}g</p>
      {nutritions &&
        nutritions.map((item: any) => (
          <p key={uuid()}>
            {item.label === 'Fat' && (
              <span> fat: {Math.round(item.total) + '%'} </span>
            )}
            {item.label === 'Carbs' && (
              <span> carbs: {Math.round(item.total) + '%'}</span>
            )}
            {item.label === 'Protein' && (
              <span> protein: {Math.round(item.total) + '%'} </span>
            )}
          </p>
        ))}
      <p>meal type: {mealType}</p>
      <p>diet: {dietLabels}</p>
      <p>dish: {dish}</p>
      <p>cuisine type: {cuisineType}</p>
      <img src={image} alt="no image" />
      <ul className="ingredient-list">
        {ingredients.map((ingredient: any) => (
          <li className="ingredient-u-list" key={uuid()}>
            {ingredient.text}
          </li>
        ))}
      </ul>
      <Button
        onClick={() => onCopyHandler(recipe.toString())}
        variant="secondary"
        size="sm"
      >
        {isCopied ? 'copied!' : 'copy'}
      </Button>
      <br />
      <br />
    </>
  );
};

export default RecipeCard;
