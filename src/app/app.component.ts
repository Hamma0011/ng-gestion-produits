import { Component } from '@angular/core';
import { ProduitsService } from './services/produits.service';
import { Produit } from './model/produit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-gestion-produits';
  name = 'Mohamed';
  nameList = [ 'Mohamed' , 'Ali' , 'Samia' , 'Saleh' , ];
  actions:Array<any>=
  [
    {titre:"Accueil",route:"/accueil"},
    {titre:"Liste des produits",route:"/produits"},
    {titre:"Ajouter Produit",route:"/ajouterproduit"},
    {titre:"Categories",route:"/categories"}
  ]
  
  actionCourante: any;
  searchQuery: string = ''; // Champ de recherche
  produitRecherche: Produit | null = null; // Produit trouvé
  errorMessage: string = '';  // Message d'erreur

  constructor(private produitsService: ProduitsService) {} // Injection du service

  setActionCourante(a: any): void {
    this.actionCourante = a;
  }
  getIconClass(action: any): string {
    switch (action.titre) {
      case 'Accueil':
        return 'bi bi-house';
      case 'Liste des produits':
        return 'bi bi-list';
      case 'Ajouter Produit':
        return 'bi bi-plus-circle';
        case 'Categories':
          return 'bi bi-border-all';
      default:
        return 'bi bi-question-circle';
    }
  }
  /*
   // Méthode de recherche
   rechercherProduit() {
    // Vérification si la recherche est un nombre (ID) ou un texte (Code)
    const isId = !isNaN(Number(this.searchQuery.trim()));

    if (isId) {
      // Si c'est un nombre, rechercher par ID
      const id = Number(this.searchQuery.trim());
      this.produitsService.rechercherProduitParId(id).subscribe(
        (produit) => {
          this.produitRecherche = produit;
          this.errorMessage = '';  // Réinitialiser le message d'erreur
        },
        (error) => {
          console.error('Produit non trouvé par ID', error);
          this.produitRecherche = null;
          this.errorMessage = 'Produit non trouvé';
        }
      );
    } else {
      // Si ce n'est pas un nombre, rechercher par Code
      this.produitsService.rechercherParCode(this.searchQuery.trim()).subscribe(
        (produit) => {
          this.produitRecherche = produit;
          this.errorMessage = '';  // Réinitialiser le message d'erreur
        },
        (error) => {
          console.error('Produit non trouvé par Code', error);
          this.produitRecherche = null;
          this.errorMessage = 'Produit non trouvé';
        }
      );
    }}*/
}
