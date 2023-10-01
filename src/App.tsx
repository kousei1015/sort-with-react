import React from "react";
import RecipesList from "./components/RecipesList";
import { recipes } from "./mockRecipes";

const App = () => {
  return (
    <div>
      <RecipesList recipes={recipes} />
    </div>
  );
};

export default App;
