import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';
import { Categorie } from '../model/produit';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: Array<Produit> = []; // Liste complète des produits
  produitsFiltres: Array<Produit> = []; // Liste filtrée des produits
  categories: Array<Categorie> = []; // Liste des catégories
  IdFilter:number| null = null;
  categorieFilter: number | null = null; // Catégorie sélectionnée pour le filtre
  prixMin: number | null = null; // Prix minimum pour le filtre
  prixMax: number | null = null; // Prix maximum pour le filtre
  designationFiltres: string ="";

  // Objet produit actuellement sélectionné pour l'édition
  produitCourant = new Produit();
  etatedit = false;

  constructor(private produitsService: ProduitsService,
  private categoriesService: CategoriesService // Injection du service CategoriesService
  )
  {}

  ngOnInit(): void {
    console.log("Initialisation du composant:.....");
    this.consulterProduits();
    this.chargerCategories(); // Charger les catégories
    
  }

  // Charger la liste des produits
  consulterProduits(): void {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits().subscribe({
      next: (data) => {
        console.log("Succès GET");
        this.produits = data;
        this.produitsFiltres = data; // Initialiser la liste filtrée avec tous les produits
      },
      error: (err) => {
        console.log("Erreur GET");
      },
    });
  }

  // Charger la liste des catégories
  chargerCategories(): void {
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

  filtrerProduits(): void {
    this.produitsFiltres = this.produits.filter((p) => {
      // Filtre par désignation
      const correspondDesignation =
        !this.designationFiltres ||
        (p.designation && p.designation.toLowerCase().includes(this.designationFiltres.toLowerCase()));
  
      // Filtre par catégorie
      const correspondCategorie =
        !this.categorieFilter || Number(p.categorie?.id) === Number(this.categorieFilter);
  
      // Filtre par intervalle de prix
      const correspondPrix =
        (!this.prixMin || Number(p.prix) >= Number(this.prixMin)) &&
        (!this.prixMax || Number(p.prix) <= Number(this.prixMax));
  
      // Retourner true si tous les critères sont remplis
      return correspondDesignation && correspondCategorie && correspondPrix;
    });
  
    console.log('Produits filtrés :', this.produitsFiltres);
  }
  filtrerProduitParId(idP: number | null): void {
    if (idP !== null && !isNaN(idP)) { // Vérifie que l'ID est défini et valide
      this.produitsService.rechercherProduitParId(idP).subscribe({
        next: (produit) => {
          if (produit) {
            console.log('Produit trouvé :', produit);
            this.produitsFiltres = [produit]; // Met à jour le tableau avec le produit trouvé
          } else {
            console.warn('Aucun produit trouvé avec cet ID.');
            this.produitsFiltres = []; // Réinitialise en cas de réponse vide
          }
        },
        error: (err) => {
          console.error('Erreur lors de la recherche :', err);
          this.produitsFiltres = []; // Réinitialise en cas d'erreur
        },
      });
    } else {
      this.produitsFiltres = [...this.produits]; // Réinitialise si l'input est vide
    }
  }
  
  

  // Méthode pour filtrer par désignation
  filtrerParDesignation(): void {
    if (!this.designationFiltres) {
      this.produitsFiltres = this.produits; // Afficher tous les produits si aucun filtre n'est saisi
    } else {
      this.produitsFiltres = this.produits.filter((p) =>p.designation && p.designation.toLowerCase().includes(this.designationFiltres.toLowerCase()));
    }
    console.log('Produits filtrés par désignation :', this.produitsFiltres);
  }


  // Filtrer les produits par catégorie
  filtrerProduitsCat(): void {
    
    if (this.categorieFilter) {
      console.log('categorieFilter=',this.categorieFilter);
      
      this.produitsFiltres = this.produits.filter((p) => Number(p.categorie?.id) === Number(this.categorieFilter));
    } else {
      this.produitsFiltres = this.produits; // Afficher tous les produits si aucune catégorie n'est sélectionnée
    }
  }

  filtrerProduitsPrix(): void {
    this.produitsFiltres = this.produits.filter((p) => {
      // Filtre par catégorie
      const correspondCategorie =
        !this.categorieFilter || Number(p.categorie?.id) === Number(this.categorieFilter);

      // Filtre par intervalle de prix
      const correspondPrix =
        (!this.prixMin || Number(p.prix) >= Number(this.prixMin)) &&
        (!this.prixMax || Number(p.prix) <= Number(this.prixMax));
        //this.filtrerProduitsCat()

      // Retourner true si les deux conditions sont remplies
      return correspondCategorie && correspondPrix;
    });

    console.log('Produits filtrés :', this.produitsFiltres);
  }


  

  // Méthode pour éditer un produit
  EditProduit(produit: Produit): void {
    this.etatedit = true;
    this.produitCourant = { ...produit };
  }

  // Ajouter un nouveau produit
  ajouterProduit(form: NgForm): void {
    const nouveauProduit = form.value;
    this.produitsService.addProduit(nouveauProduit).subscribe({
      next: (produitAjoute) => {
        console.log('Succès POST : Produit ajouté', produitAjoute);
        this.consulterProduits(); // Recharger la liste des produits
        form.resetForm(); // Réinitialiser le formulaire
        this.effacerSaisie();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du produit', err);
      },
    });
  }

  // Valider le formulaire
  validerFormulaire(form: NgForm): void {
    const produitFormulaire = form.value;
    if (!produitFormulaire.id) {
      console.log('Erreur: L\'ID est vide. Aucun produit à mettre à jour.');
      return;
    }
    const produitExistant = this.produits.find((p) => p.id === produitFormulaire.id);

    if (produitExistant) {
      const confirmation = confirm(`Voulez-vous modifier le produit avec l'ID ${produitFormulaire.id} ?`);
      if (confirmation) {
        console.log('Modification confirmée...');
        this.mettreAJourProduit(form);
        this.consulterProduits();
        this.etatedit = false;
      } else {
        console.log('Modification annulée...');
      }
    } else {
      console.log('Produit introuvable pour l\'ID fourni.');
    }
  }

  // Effacer la saisie
  effacerSaisie() {
    this.produitCourant = new Produit();
  }

  // Supprimer un produit
  supprimerProduit(produit: Produit): void {
    const confirmation = confirm(`Voulez-vous supprimer le produit : ${produit.designation} ?`);
    if (confirmation && produit.id) {
      this.produitsService.deleteProduit(produit.id).subscribe({
        next: () => {
          console.log('Succès DELETE');
          this.consulterProduits()
          this.produits = this.produits.filter((p) => p.id !== produit.id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        },
      });
    }
  }

  // Mettre à jour un produit
  mettreAJourProduit(form: NgForm): void {
  const produitMisAJour = form.value;
  if (produitMisAJour.id) {
    
    console.log('Produit à mettre à jour :', produitMisAJour.id);
    console.log('produitMisAJour :', produitMisAJour);
    
    this.produitsService.updateProduit(produitMisAJour.id, produitMisAJour).subscribe({
      next: (produitModifie) => {
        const produit = produitModifie as Produit;
        console.log('Succès PUT : Produit mis à jour', produit);
        const index = this.produits.findIndex((p) => p.id === produit.id);
        if (index !== -1) {
          this.produits[index] = produit;
        }
        form.resetForm();
        this.effacerSaisie();
        //alert('Produit mis à jour avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        alert('Erreur lors de la mise à jour du produit. Veuillez réessayer.');
      },
    });
  } else {
    alert('Erreur : ID du produit manquant.');
  }
}
}