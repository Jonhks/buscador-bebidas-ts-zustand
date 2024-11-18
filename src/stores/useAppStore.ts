import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlide } from "./favoriteSlice";
import {
  createNotificationsSlide,
  NotificationsSliceType,
} from "./notificationsSlice";

export const useAppStore = create<
  RecipesSliceType & FavoritesSliceType & NotificationsSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlide(...a),
    ...createNotificationsSlide(...a),
  }))
);
