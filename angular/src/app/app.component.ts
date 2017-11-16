import { Component, ViewChild} from '@angular/core';
import { BornesService } from './services/bornes.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Borne } from './model/borne';
import { MatTableDataSource, MatPaginator} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
 
  bornes:Array<Borne>
  dataSource;
  title = 'app';
  displayedColumns = ['reference', 'adresse', 'cp', 'ville'];
  
  //Position Paris
  lat=48.8534;
  lng=2.3488;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bornesService:BornesService){
    console.log("Init");
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.bornesService.getBornes().subscribe(bornes => {
      this.bornes=bornes
      this.dataSource = new MatTableDataSource(bornes);
      this.dataSource.paginator = this.paginator;
    });

  
  }
  
  selectRow(borne:Borne) {
    
     let [lat, lng] = borne.coord.split(",");
     this.lat = Number(lat);
     this.lng = Number(lng);
     console.log(this.lng, this.lat);
    }
 
}
