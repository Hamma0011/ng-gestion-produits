import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie, Produit } from '../model/produit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  // Url du service web de gestion de produits
  urlHote = "http://localhost:3333/produits/";

  constructor(private http: HttpClient) { }

  // Récupérer tous les produits
  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.urlHote);
  }

  // Supprimer un produit par ID
  deleteProduit(idP: number | undefined) {
    return this.http.delete(this.urlHote + idP);
  }

  // Ajouter un nouveau produit
  addProduit(nouveau: Produit) {
    return this.http.post<Array<Produit>>(this.urlHote, nouveau);
  }

  // Mettre à jour un produit
  updateProduit(idP: number, nouveau: Produit) {
    return this.http.put(this.urlHote + idP, nouveau);
  }

  // Rechercher un produit par ID
  rechercherProduitParId(idP: number): Observable<Produit> {
    return this.http.get<Produit>(this.urlHote + idP);
  }
  
  rechercherParCode(code: string): Observable<any> {
    return this.http.get(`${this.urlHote}?code=${code}`);
  }


}
