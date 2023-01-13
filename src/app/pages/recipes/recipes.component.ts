import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RecipesService } from './recipes.service';
type TRecipe = {
  Name: string;
  url: string;
  Description: string;
  Author: string;
  Ingredients: string[];
  Method: string[];
};
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  recipes: any = [];
  totalRecords: number = 0;
  pageLength: number = 2;
  selectedRecipe!: TRecipe;
  modalRef!: BsModalRef;
  constructor(
    private readonly recipesService: RecipesService,
    private readonly modalService: BsModalService
  ) {}

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
  openRecipe(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
