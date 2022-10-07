import { useState } from "react";

import { categories } from "./assets/categories.json";

import "./App.css";

interface Category {
  id: number;
  name: string;
  sublevels?: Category[];
}

interface MenuProps {
  categories: Category[];
}

interface MenuItemProps {
  category: Category;
}

function MenuItem({ category }: MenuItemProps): JSX.Element {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <li key={category.id}>
      <span>
        {category.name}
        {category.sublevels && (
          <button className="button" onClick={() => setCollapsed(!isCollapsed)}>
            <span className="button__label">{isCollapsed ? "+" : "-"} </span>
          </button>
        )}
      </span>

      {category.sublevels && !isCollapsed && <Menu categories={category.sublevels} />}
    </li>
  );
}

function Menu({ categories }: MenuProps): JSX.Element {
  return (
    <ol>
      {categories.map((category: Category) => (
        <MenuItem key={category.id} category={category} />
      ))}
    </ol>
  );
}

function App(): JSX.Element {
  return (
    <div className="App">
      <h1> Welcome to Vite </h1>
      <Menu categories={categories} />
    </div>
  );
}

export default App;
