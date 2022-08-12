import React from 'react';
import getRecipeInfo, { clearConsole } from '../../lib/getRecipeData';
import RecipeCard from '../RecipeCard/RLRecipeCard';
import RLSearchBox from '../RLSearchBox';
// import rl_image from '../../assets/rl_background_image.jpg';

interface RLRecipeDisplayPageProp {}

const RLRecipePage: React.FC<RLRecipeDisplayPageProp> = () => {
  const [recipes, setRecipes] = React.useState<string[] | any>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [dsq, setDsq] = React.useState<boolean>(false);
  const text = searchQuery ? searchQuery : 'egg white...';

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line no-undef
    const el = document.querySelector<HTMLElement>('.sometext');
    try {
      if (!searchQuery.length) {
        el !== null ? (el.style.display = 'block') : void 0;
      } else {
        el !== null && (el.style.display = 'none');
        getRecipeInfo(searchQuery).then((data) => setRecipes(data?.hits));
        setDsq(true);
      }
    } catch (e) {}
  };

  React.useEffect(() => {
    clearConsole();
  }, [searchQuery]);

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };
  const renderLink = (sQuery: string) =>
    `https://www.google.com/search?q=${sQuery}`;

  return (
    <div>
      <RLSearchBox
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        query={searchQuery ? searchQuery : ''}
        placeholderText={text}
      />
      <br />
      {dsq && <h6>{recipes.length} results</h6>} <br />
      <div>
        {recipes &&
          recipes.map((recipeInfo: any, idx: any) => (
            <RecipeCard
              key={idx}
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
                    href={renderLink(recipeInfo?.recipe?.label)}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
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
                    href={renderLink(recipeInfo?.recipe?.label)}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    learn more about {recipeInfo?.recipe?.label}
                  </a>
                )
              }
            />
          ))}
        {/* <img src={rl_image} alt="no image to show" width="800" height="345" /> */}
      </div>
    </div>
  );
};

export default RLRecipePage;
