import { Component } from '@angular/core';

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
    {titre:"Ajouter Produit",route:"/ajouterproduit"}
  ]
  
  actionCourante: any;
  setActionCourante(a: any): void {
    this.actionCourante = a;
  }

}
