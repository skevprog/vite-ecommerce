import { useState } from "react";

import { Category } from "../../types";

import "./styles.css";

interface MenuProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
  selectedCategory?: Category;
}

interface MenuItemProps {
  category: Category;
  onClick: (category: Category) => void;
  selectedCategory?: Category;
}

function MenuItem({ category, onClick, selectedCategory }: MenuItemProps): JSX.Element {
  const [isCollapsed, setCollapsed] = useState<boolean>(true);

  function collpase(e: React.MouseEvent): void {
    e.stopPropagation();
    setCollapsed(!isCollapsed);
  }

  return (
    <li key={category.id}>
      <span
        className={selectedCategory?.name === category.name ? "selected" : ""}
        onClick={() => onClick(category)}
      >
        {category.name}
        {category.sublevels && (
          <button className="button" onClick={collpase}>
            <span className="button__label">{isCollapsed ? "+" : "-"} </span>
          </button>
        )}
      </span>

      {category.sublevels && !isCollapsed && (
        <Menu
          categories={category.sublevels}
          selectedCategory={selectedCategory}
          onCategoryClick={onClick}
        />
      )}
    </li>
  );
}

function Menu({ categories, onCategoryClick, selectedCategory }: MenuProps): JSX.Element {
  return (
    <ol>
      {categories.map((category: Category) => (
        <MenuItem
          key={category.id}
          category={category}
          selectedCategory={selectedCategory}
          onClick={(category) => onCategoryClick(category)}
        />
      ))}
    </ol>
  );
}

export default Menu;
