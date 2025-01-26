import { Component } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';
import { Categorie, Produit } from '../model/produit';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent {
  produits: Array<Produit> = [];
  categories: Array<Categorie> = [];
  nouveauProduit: Produit = new Produit(); // Nouveau produit à ajouter

  constructor(
    private produitsService: ProduitsService,
    private categoriesService: CategoriesService // Injection du service CategoriesService
  ) {}
  // Initialisation du composant
  ngOnInit(): void {
    console.log("Initialisation du composant:.....");
    this.produitsService.getProduits().subscribe({
      next: (data) => {
        console.log('Produits récupérés avec succès :', data);
        this.produits = data;},
      error: (err) => {
        console.error('Erreur lors de la récupération des produits :', err);},
    });
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        console.log('Catégories récupérées avec succès :', data);
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories :', err);
      },
    });
  }

  // Validation du formulaire
  validerFormulaire(): void {
    const produitExistant = this.produits.some((p) => p.id === this.nouveauProduit.id);
    if (produitExistant) {
      alert('Identificateur de produit déjà existant..');
    } else {
      this.ajouterProduit();
    }
  }

  // Ajouter un produit
  ajouterProduit(): void {
    this.produitsService.addProduit(this.nouveauProduit).subscribe({
      next: (produitAjoute) => {
        console.log('Produit ajouté avec succès :', produitAjoute);
        this.consulterProduits()
        //this.produits.push(produitAjoute); // Mise à jour locale
        this.nouveauProduit = new Produit(); // Réinitialiser le formulaire
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du produit :', err);
      },
    });
  }
  consulterProduits()
 {
console.log("Récupérer la liste des produits");
//Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
this.produitsService.getProduits().subscribe(
{
//En cas de succès
next: data=> {
console.log("Succès GET");
this.produits=data;
},
//En cas d'erreur
error: err=> {
console.log("Erreur GET");
}
}
)
}
}
