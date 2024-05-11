<script setup lang="ts">
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { COCKTAIL_BY_ID } from '../constants';
import AppLayout from '../components/AppLayout.vue';
import type { Drink, Ingredient, ServerData } from '../types';

const route = useRoute();

const cocktail = ref<Drink>();
const cocktailId = computed((): string | undefined =>
    route.path.split('/').pop()
);

const ingredients = computed(():Ingredient[] => {
    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 15; i++) {
        if (!cocktail.value || !(`strIngredient${i}` in cocktail.value)) break;

        const ingredient = {
            strIngredient1: cocktail.value[`strIngredient${i}` as keyof Drink],
            measure: cocktail.value[`strMeasure${i}` as keyof Drink],
        };

        ingredients.push(ingredient);
    }

    return ingredients;
});

async function getCocktail(): Promise<void> {
    const data = await axios.get<ServerData>(
        `${COCKTAIL_BY_ID}${cocktailId.value}`
    );
    cocktail.value = data?.data?.drinks[0];
}

getCocktail();
</script>

<template>
    <div v-if="cocktail" class="wrap">
        <AppLayout :imgUrl="cocktail.strDrinkThumb">
            <div class="wrapper">
                <div class="info">
                    <div class="title">{{ cocktail.strDrink }}</div>
                    <div class="line"></div>
                    <div class="list">
                        <div
                            v-for="(item, key) in ingredients"
                            :key="key"
                            class="list-item"
                        >
                            {{ item.strIngredient1 }}
                            <template v-if="item.measure">
                                |
                                {{ item.measure }}
                            </template>
                        </div>
                    </div>
                    <div class="instructions">
                        {{ cocktail.strInstructions }}
                    </div>
                </div>
            </div>
        </AppLayout>
    </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'
</style>
