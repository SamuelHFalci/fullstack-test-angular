import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from './recipes.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [RecipesService, HttpClient],
})
export class RecipesModule {}
