export class Admin {
    constructor(
  public matricule:number,
  public nom:String,
 public prenom:String,
 public login: String,
  public motDePasse:string,
  public _id?:string,
  public code?:string,
  public isAdmin?:boolean
    ){}

}

