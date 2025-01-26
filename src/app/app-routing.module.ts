import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { ProduitsComponent } from './produits/produits.component';
import { CategoriesComponent } from './categories/categories.component';


const routes: Routes = [
  {path:"accueil",component: AccueilComponent},
  {path:"produits",component:ProduitsComponent},
  {path:"ajouterproduit",component:AjoutProduitComponent},
  {path:"categories",component:CategoriesComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
