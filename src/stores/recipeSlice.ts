import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipes,
  getIdRecipe,
} from "../services/RecipesService";
import { Categories, SearchFilters, Drinks, Drink, Recipe } from "../types";
export type RecipesSliceType = {
  drinks: Drinks;
  categories: Categories;
  recipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilters) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  drinks: {
    drinks: [],
  },
  categories: {
    drinks: [],
  },
  recipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set(() => ({
      categories,
    }));
  },
  searchRecipes: async (searchFilters) => {
    const drinks = await getRecipes(searchFilters);
    set(() => ({
      drinks,
    }));
  },
  selectRecipe: async (id) => {
    const recipe = await getIdRecipe(id);
    set(() => ({
      recipe,
      modal: true,
    }));
  },
  closeModal: () => {
    set(() => ({
      modal: false,
      recipe: {} as Recipe,
    }));
  },
});
