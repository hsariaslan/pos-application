import {useEffect, useState} from "react";
import {PlusOutlined, EditOutlined} from "@ant-design/icons";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";
import "./categories.css";

const Categories = ({categories, setCategories, products, setFilteredProducts}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === categoryTitle));
    }
  }, [products, setFilteredProducts, categoryTitle]);

  return (
    <ul className="flex md:flex-col gap-4 text-lg">
      {categories.map((item) => (
        <li
          key={item._id}
          className={`category-item ${item.title === categoryTitle && "!bg-pink-700"}`}
          onClick={() => setCategoryTitle(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}
      <li className="category-item !bg-purple-800 hover:opacity-80" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li className="category-item !bg-orange-800 hover:opacity-80" onClick={() => setIsEditModalOpen(true)}>
        <EditOutlined className="md:text-2xl" />
      </li>
      <CreateCategory
        categories={categories}
        setCategories={setCategories}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <EditCategory
        categories={categories}
        setCategories={setCategories}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </ul>
  );
};

export default Categories;