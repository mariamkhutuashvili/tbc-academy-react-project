"use client";

import { useI18n } from "../../locales/client";
import "./FilterCategory.css";

const categories: Category[] = [
  { id: "categories", name: "Filter by Category" },
  { id: "food", name: "Cat Food" },
  { id: "toys", name: "Playtime Toys" },
  { id: "beds", name: "Cat Beds" },
  { id: "accessories", name: "Cat Accessories" },
  { id: "grooming", name: "Grooming Essentials" },
  { id: "litter", name: "Cat Litter" },
];

export default function FilterCategory({
  selectedCategory,
  setSelectedCategory,
}: FilterProps) {
  const t = useI18n();

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value);
  }
  return (
    <div className="category-container">
      <div className="select-wrapper">
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="category-select"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {t(
                category.id as
                  | "categories"
                  | "food"
                  | "toys"
                  | "beds"
                  | "accessories"
                  | "grooming"
                  | "litter"
              )}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
