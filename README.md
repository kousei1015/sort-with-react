# sort-with-react

React でデータをソート機能を実装する方法についてレポジトリです。

以下は説明する上で使うファイル

```
.
├── src
│   └── components
│       └── RecipesList.tsx
├── mockRecipes.ts
└── App.tsx
```

レシピアプリを作っていた、このようなデータをバックエンド API から取得したとします。

```
export type Recipe = {
  id: number;
  name: string;
};

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "カレーライス",
  },
  {
    id: 2,
    name: "すき焼き",
  },
  {
    id: 3,
    name: "ステーキ",
  },
  {
    id: 4,
    name: "寿司",
  },
];

```

そして、App.tsx でこのように書いて、RecipesList.tsx ファイルにデータを渡す。

```
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
```

最後に、RecipesList.tsx で以下のように書く。

```
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

```

descendingSort関数内でsetSortRecipesを呼び出す際、スプレッド構文を使用するのが重要です。Reactはstateが変更されると再レンダリングが行われるはずですが、この検知は内部的にはObject.isによる比較アルゴリズムを使用しています。つまり、stateが変更されたかどうかは、そのデータのメモリアドレスが異なるかどうかによって判断されます。

そのため、破壊的なメソッド（例えばsortやpushなど）を使っても、新しいデータのメモリアドレスが必要です。スプレッド構文を使うことで、新しいメモリアドレスを持つデータを作成し、再レンダリングが正しくトリガーされるようになります。

例えば、以下のように書いても、再レンダリングが行われないことになります
```
setSortRecipes(recipes.sort((a, b) => b.id - a.id));
```

この点に留意して、データの更新を行う際は、スプレッド構文などを使って新しいデータを作成しましょう。

## 結論
sortメソッドなどの破壊的メソッドを使用して再レンダリングを走らせたいときは、スプレッド構文を使いましょう。