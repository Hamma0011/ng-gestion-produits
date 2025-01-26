export class Produit {
  id?:number | undefined;
  code:string | undefined;
  designation: string | undefined;
  prix:number | undefined
  categorie?: Categorie | undefined;
  }
  export class Categorie {
    id?: number | undefined;
    code: string | undefined;
    libelle?: string | undefined;
  }
