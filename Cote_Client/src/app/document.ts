import { Admin } from "./admin";

export class Document {
    constructor(
    
        public chemin?:string,
        public docurl?:string,
        public nom?:string,
        public _id?: string,
        public user?:string){ }
}
