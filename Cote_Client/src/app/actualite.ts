import { Admin } from "./admin";

export class Actualite {
    constructor(
        public objet:string,
       public corps:String,
       public lien: String,
       public date:Date,
       public description: String,
       public _id?:string,
       public user?:Admin,
       

    )
    {

    }
}
