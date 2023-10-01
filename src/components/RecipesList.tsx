import React, { useState } from "react";
import { Recipe } from "../mockRecipes";

type Props = {
  recipes: Recipe[];
};

const RecipesList = ({ recipes }: Props) => {
  const [sortRecipes, setSortRecipes] = useState(recipes);

  const descendingSort = () => {
    setSortRecipes([...recipes.sort((a, b) => b.id - a.id)]);
  };

  return (
    <div>
      {sortRecipes.map((recipe) => (
        <div key={recipe.id}>{recipe.name}</div>
      ))}
      <button onClick={descendingSort}>降順にする</button>
    </div>
  );
};

export default RecipesList;
