import { Admin } from './admin';

export class Lien {
  constructor(
    public nom?: string,
    public lien?: string,
    public icone?: any,
    public user?:string,
    public _id?: string
  ) {}
}
