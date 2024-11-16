import { StateCreator } from "zustand";
import { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  hanldeClickFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlide: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  hanldeClickFavorite: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        ),
      }));
    } else {
      // ?Existen estos dos tipos de hacerlo
      // set((state) => ({
      //   favorites: [...state.favorites, recipe],
      // }));
      set({
        favorites: [...get().favorites, recipe],
      });
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExist: (id) => {
    return get().favorites.some((fav) => fav.idDrink === id);
  },
  loadFromStorage: () => {
    const storeFavorites = localStorage.getItem("favorites");
    if (storeFavorites) {
      set({
        favorites: JSON.parse(storeFavorites),
      });
    }
  },
});
