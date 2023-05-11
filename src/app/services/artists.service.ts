import { Injectable } from '@angular/core';
import { Artist } from '../models/artist';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  ruta_servidor: string = "http://localhost:3000";
  recurso:string = "artist";

  constructor(private http:HttpClient) { }

  getArtists(){
    return this.http.get<Artist[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getArtist(id:number){
      return this.http.get<Artist>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  addArtist(artist:Artist){
    return this.http.post<Artist>(this.ruta_servidor+"/"+this.recurso,artist);
  }

  updateArtist(artist:Artist){
    return this.http.put<Artist>(this.ruta_servidor+"/"+this.recurso+"/"+artist.id.toString(),artist); 
  }

  deleteArtist(id:number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

}
