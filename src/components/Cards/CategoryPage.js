import { CardList } from "./CardList";

export const CategoryPage = ({ category }) => {
  return (
    <div className="category-page">
      <h2 className="text-center m-3">{category.toUpperCase()}</h2>
      <CardList category={category} />
    </div>
  );
};
