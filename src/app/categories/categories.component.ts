import { Component } from '@angular/core';
import { Categorie } from '../model/produit';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  listecategorie: Array<Categorie> = [];
  Nvcategorie:Categorie=new Categorie;
  etateduit = false;
  categoriecourant: Categorie = new Categorie(); 
  constructor( private categoriesService: CategoriesService )// Injection du service CategoriesService 
  {}
  ngOnInit(): void {
    console.log("Initialisation du composant:.....");

    this.chargerCategories(); // Charger les catégories
    
  }

  get categorieActuelle(): Categorie {
    return this.etateduit ? this.categoriecourant : this.Nvcategorie;
  }

  // Charger la liste des catégories
  chargerCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        console.log('Catégories récupérées avec succès :', data);
        this.listecategorie = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories :', err);
      },
    });
  }
// Ajouter une Categorie
// Ajouter ou Modifier une Catégorie
ajouterCategorie(): void {
  if (this.etateduit) {
    // Modifier une catégorie existante
    this.categoriesService.updateCategorie(this.categoriecourant).subscribe({
      next: (categorieModifiee) => {
        console.log('Catégorie modifiée avec succès :', categorieModifiee);
        this.chargerCategories(); // Recharger la liste des catégories
        this.etateduit = false; // Réinitialiser l'état
        this.categoriecourant = new Categorie(); // Réinitialiser le formulaire
      },
      error: (err) => {
        console.error('Erreur lors de la modification de la catégorie :', err);
      },
    });
  } else {
    // Ajouter une nouvelle catégorie
    this.categoriesService.addCategorie(this.Nvcategorie).subscribe({
      next: (CatAjoute) => {
        console.log('Catégorie ajoutée avec succès :', CatAjoute);
        this.chargerCategories(); // Recharger la liste des catégories
        this.etateduit = false;
        this.Nvcategorie = new Categorie(); // Réinitialiser le formulaire
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la catégorie :', err);
      },
    });
  }
}


    // Supprimer un categorie
    supprimercategorie(categorie: Categorie): void {
      const confirmation = confirm(`Voulez-vous supprimer la Categorie : ${categorie.libelle} ?`);
      if (confirmation && categorie.id) {
        this.categoriesService.deleteCategorie(categorie.id).subscribe({
          next: () => {
            console.log('Succès DELETE');
            this.chargerCategories()
            //this.produits = this.produits.filter((p) => p.id !== produit.id);
          },
          error: (err) => {
            console.error('Erreur lors de la suppression', err);
          },
        });
      }
    }
    editcategorie(categorie:Categorie){
      this.etateduit=true
      this.categoriecourant = { ...categorie }; 
    };

}
