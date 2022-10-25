import { useMemo, useState } from "react";

import { products as productsJson } from "./assets/products.json";
import { categories } from "./assets/categories.json";
import Menu from "./components/Menu";
import Products from "./components/Products";
import { Category, Product } from "./types";

import "./App.css";

function App(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const productsByCategory: Product[] = useMemo(
    () =>
      productsJson.filter(
        (product) => selectedCategory && product.sublevel_id === selectedCategory.id,
      ),
    [selectedCategory],
  );

  return (
    <div className="App">
      <h1> Welcome to Vite E-commerce </h1>
      <Menu
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={(cat) => setSelectedCategory(cat)}
      />
      <Products categoryName={selectedCategory?.name || ""} products={productsByCategory} />
    </div>
  );
}

export default App;
