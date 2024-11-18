import { StateCreator } from "zustand";
import { Recipe } from "../types";
import {
  createNotificationsSlide,
  NotificationsSliceType,
} from "./notificationsSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  hanldeClickFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlide: StateCreator<
  FavoritesSliceType & NotificationsSliceType
> = (set, get) => ({
  favorites: [],
  hanldeClickFavorite: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        ),
      }));
      createNotificationsSlide(set, get, api).showNotification({
        text: "Se elimino de favoritos",
        error: false,
      });
    } else {
      // ?Existen estos dos tipos de hacerlo
      // set((state) => ({
      //   favorites: [...state.favorites, recipe],
      // }));
      set({
        favorites: [...get().favorites, recipe],
      });
      createNotificationsSlide(set, get, api).showNotification({
        text: "Se agrego a de favoritos",
        error: false,
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
