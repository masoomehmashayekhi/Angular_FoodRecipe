import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubscription: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingredientSubscription = this.slService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }
}