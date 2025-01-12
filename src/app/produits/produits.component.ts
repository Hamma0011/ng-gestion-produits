import { Component } from '@angular/core';
import { Produit } from '../model/produit';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {
  produits: Array<Produit> = [
    { id: 1, code: 'x12', designation: "Panier plastique", prix: 20 },
    { id: 2, code: 'y4', designation: "Table en bois", prix: 100 },
    { id: 3, code: 'y10', designation: "Salon en cuir", prix: 3000 }
  ];
  // Objet produit actuellement sélectionné pour l'édition
  produitSelectionne: Produit = { id: undefined, code: '', designation: '', prix: undefined };  // Produit sélectionné


  
  etatedit=false
  EditProduit(produit: Produit): void {
    this.etatedit=true
    this.produitSelectionne = { ...produit };  // Copie de l'objet produit sélectionné
}

valider(){
  const index = this.produits.findIndex(p => p.id === this.produitSelectionne.id);
  if (index !== -1) {
    const confirmation = window.confirm('Êtes-vous sûr de cette modification ?');
  if (confirmation) {
    this.produits[index] = { ...this.produitSelectionne };  // Mettre à jour le produit dans le tableau
  }
  this.etatedit = false;  // Fermer le formulaire d'édition
  }
}

  SuppProduit(id: any): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
  if (confirmation) {
    this.produits = this.produits.filter(produit => produit.id !== id);
    this.etatedit=false
  }
}

}
