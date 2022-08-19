import React, { useState } from 'react';
import getRecipeInfo from '../../lib/getRecipeData';
import { clearConsole } from '../../lib/clearConsole';
import RecipeCard from '../RecipeCard/RLRecipeCard';
import RLSearchBox from '../RLSearchBox';
import './RLRecipeDisplayPage.css';
import { v4 as uuid } from 'uuid';

interface RLRecipeDisplayPageProps {}

// const PUSHER_DEMAND: {auth: string, nextRage: {}} = {
//   auth: 'Identifier',
//   nextRage: {
//     a: 'web',
//     b: 'ob',
//     c: 'infinite',
//     d: 'spread'
//   },
// }

const RLRecipePage: React.FC<RLRecipeDisplayPageProps> = () => {
  const [recipes, setRecipes] = useState<string[] | any>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dsq, setDSQ] = useState<boolean>(false);
  const text = searchQuery ? searchQuery : 'cream cheesecake...';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!searchQuery) {
        return;
      } else {
        const regEx = /[.@{/\\+&#:;*!=})\-_%,0-9(\d{3}|(\d{3}))]/;
        if (regEx.test(searchQuery)) {
          setDSQ(true);
        } else {
          getRecipeInfo(searchQuery).then((data) => setRecipes(data?.hits));
          setDSQ(false);
          setSearchQuery('');
        }
      }
    } catch (e) {}
  };

  React.useEffect(() => {
    clearConsole();
  }, [recipes]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(() => e.target.value);
  };
  const renderLink = (sQuery: string) =>
    `https://www.google.com/search?q=${sQuery}`;

  const renderSpan = () => (
    <span className="invalid-search-query">
      Please check your spelling or use different keywords.
    </span>
  );

  return (
    <>
      <RLSearchBox
        handleChange={onChangeHandler}
        handleSubmit={handleSubmit}
        query={searchQuery}
        placeholderText={text}
      />
      <br />
      {dsq && renderSpan()}
      <div className="search-result-display">
        {recipes && recipes.length > 0 && (
          <>
            <h6>
              {recipes.length} {recipes.length > 1 ? 'results' : 'result'}
            </h6>
            <br />
            {recipes.map((recipeInfo: any) => (
              <RecipeCard
                key={uuid()}
                title={recipeInfo?.recipe?.label}
                calories={recipeInfo?.recipe?.calories}
                nutritions={recipeInfo?.recipe?.digest}
                image={recipeInfo?.recipe?.image}
                ingredients={recipeInfo?.recipe?.ingredients}
                mealType={
                  recipeInfo?.recipe?.mealType
                    ? recipeInfo?.recipe?.mealType[0] || 'N/A'
                    : 'mealType'
                }
                cuisineType={
                  recipeInfo?.recipe?.cuisineType
                    ? recipeInfo?.recipe?.cuisineType[0] || 'N/A'
                    : 'cuisineType'
                }
                dish={
                  recipeInfo?.recipe?.dishType ? (
                    recipeInfo?.recipe?.dishType[0] || 'dish'
                  ) : (
                    <a
                      className="anchor-tag"
                      href={renderLink(recipeInfo?.recipe?.label)}
                      target="_blank"
                    >
                      more {recipeInfo?.recipe?.label}
                    </a>
                  )
                }
                dietLabels={
                  recipeInfo.recipe.dietLabels.length ? (
                    recipeInfo?.recipe?.dietLabels[0] || 'N/A'
                  ) : (
                    <a
                      className="anchor-tag"
                      href={renderLink(recipeInfo?.recipe?.label)}
                      target="_blank"
                    >
                      learn more about {recipeInfo?.recipe?.label}
                    </a>
                  )
                }
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default RLRecipePage;
