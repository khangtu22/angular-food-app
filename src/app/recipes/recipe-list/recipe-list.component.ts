import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Recipe} from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Recipe 1', 'Pacing chocolate cake', 'https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174_1280.jpg'),
    new Recipe('Recipe 2',  'Pacing chocolate cake', 'https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174_1280.jpg'),
    new Recipe('Recipe 3', 'Pacing chocolate cake', 'https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174_1280.jpg')
  ];
  constructor() { }

  onRecipeSelected(recipe: Recipe): void{
    this.recipeWasSelected.emit(recipe);
  }

  ngOnInit(): void {
  }

}
