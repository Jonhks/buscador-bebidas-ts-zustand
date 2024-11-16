import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

const Header = () => {
  const { pathname } = useLocation();

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const isHome = useMemo(() => pathname === "/", [pathname]);

  const fetchCategories = useAppStore((store) => store.fetchCategories);
  const categories = useAppStore((store) => store.categories);
  const searchRecipes = useAppStore((store) => store.searchRecipes);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Validaciones
    if (Object.values(searchFilters).includes("")) {
      console.log("Campos obligatorios");
      return;
    }

    // Consultar receta
    searchRecipes(searchFilters);
  };

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-y5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img
              src="/logo.svg"
              alt=""
              className="w-32"
            />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-36 p-10 rounded-lg shadow space-y-4"
            onSubmit={handleOnSubmit}
          >
            <div className="space-y-4">
              <label
                className="black text-white uppercase font-extrabold text-lg"
                htmlFor="ingredient"
              >
                Nombre o ingrediente:
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Café"
                value={searchFilters.ingredient}
                onChange={handleOnchange}
              />
            </div>
            <div className=" space-y-4">
              <label
                className="black text-white uppercase font-extrabold text-lg"
                htmlFor="ingredient"
              >
                Categoría:
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                value={searchFilters.category}
                onChange={handleOnchange}
              >
                <option value="">--Selecciona--</option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Receta"
              className=" cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
