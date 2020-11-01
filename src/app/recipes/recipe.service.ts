import { Recipe } from './recipe.modal';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipeChanged=new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('A Good Food', 'This is a Food Recipe',
            'https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_760/https://storage.googleapis.com/gen-atmedia/3/2018/06/d83512a0fe4e2d338f89ccde0c5de227646921cf.jpeg'
            , [
                new Ingredient('meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe('A Nice Cake', 'This is a Cake Recipe', 'https://images-gmi-pmc.edge-generalmills.com/de78a2b8-61f7-4190-bf2f-8a311bd8b6f0.jpg'
            , [
                new Ingredient('flour', 100),
                new Ingredient('milk', 1)
            ])
    ];
    constructor(private slService: ShoppingListService) { }
    getRecipes() {
        return this.recipes.slice();
    }
    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }
    addIngredienttoShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredinets(ingredients);
    }
    addRecipe(recipe:Recipe)
    {
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newRecipe:Recipe)
    {
      this.recipes[index]=newRecipe;
      this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipe(index:number)
    {
      this.recipes.splice(index);
      this.recipeChanged.next(this.recipes.slice());
    }
}
