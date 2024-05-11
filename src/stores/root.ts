import { defineStore } from 'pinia';
import axios from 'axios';
import { INGREDIENTS_URL, COCKTAILS_BY_INGR_URL } from '../constants';
import { Drink, Ingredient, ServerData } from '../types';

interface State {
    ingredients: Ingredient[];
    ingredient: string | null;
    cocktails: Drink[];
}

export const useRootStore = defineStore('root', {
    state: (): State => ({
        ingredients: [],
        ingredient: null,
        cocktails: [],
    }),
    actions: {
        async getIngredients() {
            const data = await axios.get<ServerData>(INGREDIENTS_URL);
            this.ingredients = data?.data?.drinks;
        },
        async getCocktails(ingredient: string | null) {
            const data = await axios.get<ServerData>(
                `${COCKTAILS_BY_INGR_URL}${ingredient}`
            );
            this.cocktails = data?.data?.drinks;
        },
        setIngredient(val: string | null) {
            this.ingredient = val;
        },
    },
});
