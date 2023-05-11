import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistsService } from 'src/app/services/artists.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import{ ViewChild} from '@angular/core';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {

  dataSource = new MatTableDataSource<Artist>();
  displayedColumns: string[]=["id","name","photo","favorite_sport","points","actions"];
  
  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private artistsService: ArtistsService) {}

  ngOnInit() {
    this.ChargeArtists();
  }

  filterArtists(event: Event) {
   let filtro = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filtro;
  }


  ChargeArtists(): void {

    this.artistsService.getArtists().subscribe({
      next: (data:Artist[]) => {

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteEmpleado(id: number):void {
    this.artistsService.deleteArtist(id).subscribe({
      next: (data) => {
        this.ChargeArtists();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
