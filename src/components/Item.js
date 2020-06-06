import React, { useCallback, useEffect, useState } from "react";
import Category from "./Category";

const Item = ({ item, updateItem }) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [categories, setCategories] = useState(item.categories);

  useEffect(() => {
    updateItem({
      name,
      quantity,
      categories,
    });
  }, [name, quantity, categories]);

  const updateCategory = (idx, newVal) => {
    const newCategories = [...categories];
    newCategories[idx] = newVal;
    setCategories(newCategories);
  };

  return (
    <>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      {categories.map((category, i) => (
        <Category
          key={i}
          category={category}
          updateCategory={(val) => updateCategory(i, val)}
        />
      ))}
    </>
  );
};

export default Item;
