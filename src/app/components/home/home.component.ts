import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  Artists: Artist[] = [];
  
  constructor(private artistsService:ArtistsService){}

  ngOnInit() {

    this.artistsService.getArtists().subscribe(
      (artist: Artist[]) => 
      { this.Artists = artist;}
    );

  }
}
