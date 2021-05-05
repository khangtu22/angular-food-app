import {Recipe} from './recipes.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'Pacing chocolate cake',
      'https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174_1280.jpg',
      [new Ingredient('Oliver', 9),
        new Ingredient('Bread', 12),
        new Ingredient('Onion', 122),
        new Ingredient('Tomato', 11)
      ]
    ),
    new Recipe(
      'Recipe 2',
      'Pacing chocolate cake',
      'https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174_1280.jpg',
      [new Ingredient('Oliver', 2),
        new Ingredient('Bread', 12),
        new Ingredient('Onion', 11),
        new Ingredient('Tomato', 1)
      ]
      ),
    new Recipe(
      'Recipe 3',
      'Pacing chocolate cake',
      'https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174_1280.jpg',
      [new Ingredient('Oliver', 2),
        new Ingredient('Bread', 12),
        new Ingredient('Onion', 11),
        new Ingredient('Tomato', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): Array<Recipe>{
    return this.recipes.slice();
  }
  getRecipeById(index: number): Recipe{
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]): void{
    this.shoppingListService.addListOfIngredient(ingredients);
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void{
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
