import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service'; // Assurez-vous d'importer le service

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  produits: Array<Produit> = [];

  imageMap: { [key: string]: string } = {
    ordinateur: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiv2C2RQORCLYF6c7_lZ31XTRfAmKFbhuO_Q&s',
    smartphone:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT31ZYElNBorjHHfrdqwAMMI7IfaoKD1CMhhQ&s',
    tablette :'https://cdn.idealo.com/folder/Product/201700/8/201700840/s4_produktbild_gross/realme-pad.jpg',
    imprimante:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLK3GQSBG698fnIpN0JzCJlPjQbLP5foDPRg&s',
    router:'https://blog.teufelaudio.com/wp-content/uploads/2017/06/what-is-a-router.jpg',
    puzzle:'https://www.magikgames.tn/23126-large_default/puzzle-100-pieces-xxl-sports-dhiver.jpg',
    ballon:'https://contents.mediadecathlon.com/p2585553/k$673db82611fdf671b86a58a8d895dcd1/ballon-de-football-hybride-fifa-basic-club-ball-taille-4-blanc.jpg?format=auto&quality=40&f=800x800',
    smartwatch:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1UYK9I6bLwtO25xh1cFq5BiaF8Sn5YzPfeg&s',
    velo:'https://contents.mediadecathlon.com/p755079/k$041fd030a0b23286daef6e1b94d4aa48/1000x0/2614pt2411/5228xcr5228/vtt_rockrider.jpg?format=auto'
  };

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.produitsService.getProduits().subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des produits :', error);
      }
    );
  }

  getPhotoUrl(designation: string | undefined): string {
    return this.imageMap[designation?.toLowerCase() || ''] || 'assets/default-product.png';
  }
}
