import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipes.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put('https://recipe-77a7c-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipe() {
    return this.http
      .get<Recipe[]>('https://recipe-77a7c-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }))
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
