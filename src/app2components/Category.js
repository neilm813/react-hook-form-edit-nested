import React from "react";

const Category = ({ category, updateCategory }) => {
  return (
    <div>
      <input
        type="text"
        value={category}
        onChange={(e) => updateCategory(e.target.value)}
      />
    </div>
  );
};

export default Category;
