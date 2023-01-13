import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
type TRecipe = {
  Name: string;
  url: string;
  Description: string;
  Author: string;
  Ingredients: string[];
  Method: string[];
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  recipes: any = [];
  totalRecords: number = 0;
  pageLength: number = 2;
  constructor(private readonly recipesService: RecipesService) {}

  ngOnInit(): void {
    let lastPage = 0;
    let lastSearchText = '';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.pageLength,
      lengthMenu: [2, 5, 10, 20],
      displayStart: lastPage, // Last Selected Page
      search: { search: lastSearchText }, // Last Searched Text
      serverSide: true,
      processing: true,
      data: this.recipes,

      ajax: (dataTablesParameters: any, callback) => {
        lastPage = dataTablesParameters.start; // Note :  dataTablesParameters.start = page count * table length
        lastSearchText = dataTablesParameters.search.value;
        this.recipesService
          .getRecipes(dataTablesParameters)
          .toPromise()
          .then((res: any) => {
            this.recipes = res.data;
            this.totalRecords = res.recordsTotal;
            callback({
              recordsTotal: this.totalRecords,
              recordsFiltered: this.totalRecords,
              data: [],
            });
          });
      },
    };
  }
  openRecipe(recipe: TRecipe) {
    console.log(recipe);
  }
}
