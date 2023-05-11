import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistsService } from 'src/app/services/artists.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  myForm!:FormGroup;
  id!:number;
  
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
    this.id = this.activatedRouter.snapshot.params["id"];
    this.artistsService.getArtist(this.id).subscribe({
      next: (data:Artist) => {
        this.myForm.get("id")?.setValue(data.id);
        this.myForm.get("nombre")?.setValue(data.name);
        this.myForm.get("foto")?.setValue(data.photo);
        this.myForm.get("deporte_favorito")?.setValue(data.favorite_sport);   
        this.myForm.get("puntos")?.setValue(data.points);       
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editArtist():void {

    const artist:Artist = {
      id: parseInt(this.myForm.get("id")!.value),
      name: this.myForm.get("nombre")!.value,
      photo: this.myForm.get("foto")!.value,
      favorite_sport: this.myForm.get("deporte_favorito")!.value,
      points: parseInt(this.myForm.get("puntos")!.value), 
    }

    this.artistsService.updateArtist(artist).subscribe({
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
