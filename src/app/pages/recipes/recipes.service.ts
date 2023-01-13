import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getApiBaseUrl } from '../../../config/apiBaseUrl';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private readonly httpClient: HttpClient) {}
  getRecipes(query: any) {
    const baseUrl = getApiBaseUrl();
    return this.httpClient.get(`${baseUrl}/api/recipes`, {
      params: query,
    });
  }
}
