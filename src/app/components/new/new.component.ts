import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Artist } from 'src/app/models/artist';
import { ArtistsService } from 'src/app/services/artists.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

  myForm!:FormGroup;
  
  constructor(private formBuilder:FormBuilder, private artistsService:ArtistsService, 
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar){}

  ngOnInit(){
      this.reactiveForm();
  }

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
        id:[""],
        nombre:["",[Validators.required, Validators.maxLength(60)]],
        foto:[""],
        deporte_favorito:[""],
        puntos:["",[Validators.required, Validators.min(0) ,Validators.max(100)]],
    });   
  }

  saveArtist():void {

    const artist:Artist = {
      id: parseInt(this.myForm.get("id")!.value),
      name: this.myForm.get("nombre")!.value,
      photo: this.myForm.get("foto")!.value,
      favorite_sport: this.myForm.get("deporte_favorito")!.value,
      points: parseInt(this.myForm.get("puntos")!.value), 
    }

    this.artistsService.addArtist(artist).subscribe({
      next: (data)  => {
        this.router.navigate(["/artists"]);
        this.snackBar.open("El artista se ingresó correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  returnHome():void {
    this.router.navigate(["/busines/artists"]);
  }
}
