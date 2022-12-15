import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class Storage{

  constructor() {
  }

  setItem(key: string, value: string){
    localStorage.setItem(key, value);
  }

  getItem(key: string){
    return localStorage.getItem(key);
  }

  removeItem(key: string){
    localStorage.removeItem(key);
  }
}
