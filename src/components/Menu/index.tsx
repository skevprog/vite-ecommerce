import { useState } from "react";

import { Category } from "../../types";

interface MenuProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

interface MenuItemProps {
  category: Category;
  onClick: (category: Category) => void;
}

function MenuItem({ category, onClick }: MenuItemProps): JSX.Element {
  const [isCollapsed, setCollapsed] = useState<boolean>(true);

  function collpase(e: React.MouseEvent): void {
    e.stopPropagation();
    setCollapsed(!isCollapsed);
  }

  return (
    <li key={category.id}>
      <span onClick={() => onClick(category)}>
        {category.name}
        {category.sublevels && (
          <button className="button" onClick={collpase}>
            <span className="button__label">{isCollapsed ? "+" : "-"} </span>
          </button>
        )}
      </span>

      {category.sublevels && !isCollapsed && (
        <Menu categories={category.sublevels} onCategoryClick={onClick} />
      )}
    </li>
  );
}

function Menu({ categories, onCategoryClick }: MenuProps): JSX.Element {
  return (
    <ol>
      {categories.map((category: Category) => (
        <MenuItem
          key={category.id}
          category={category}
          onClick={(category) => onCategoryClick(category)}
        />
      ))}
    </ol>
  );
}

export default Menu;
