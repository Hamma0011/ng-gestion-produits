import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // URL du service web de gestion des catégories
  private urlHoteCat = "http://localhost:3333/categories/";

    // Méthode pour récupérer les catégories
    getCategories(): Observable<Categorie[]> {
      return this.http.get<Categorie[]>(this.urlHoteCat);
    }

  constructor(private http: HttpClient) {}

  
  // Méthode pour ajouter une nouvelle catégorie
  addCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.urlHoteCat, categorie);
  }


  // Méthode pour modifier une catégorie existante
  updateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(this.urlHoteCat, categorie);
  }

    // Méthode pour supprimer une catégorie par ID
    deleteCategorie(id: number): Observable<void> {
      return this.http.delete<void>(`${this.urlHoteCat}${id}`);
    }
}
