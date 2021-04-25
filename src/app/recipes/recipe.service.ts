import {Recipe} from './recipes.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
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

  getRecipe(): Array<Recipe>{
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]): void{
    this.shoppingListService.addListOfIngredient(ingredients);
  }

}
