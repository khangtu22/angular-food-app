import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipes.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService ) { }
  ngOnInit(): void {
  }
  onAddShoppingList(): void{
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
