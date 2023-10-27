const Categories = () => {
  return (
    <ul className="flex md:flex-col gap-4 text-lg">
      <li className="bg-green-700 px-6 py-10 text-white cursor-pointer hover:bg-pink-700 transition-all text-center">
        <span>Tümü</span>
      </li>
      <li className="bg-green-700 px-6 py-10 text-white cursor-pointer hover:bg-pink-700 transition-all text-center">
        <span>Yiyecek</span>
      </li>
      <li className="bg-green-700 px-6 py-10 text-white cursor-pointer hover:bg-pink-700 transition-all text-center">
        <span>İçecek</span>
      </li>
    </ul>
  );
};

export default Categories;