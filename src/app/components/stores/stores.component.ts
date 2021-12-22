import { Component, OnInit } from '@angular/core';
import { Stores } from 'src/app/models/stores';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  store: Stores[] = [];

  constructor(private storesService: StoresService) {
    
  }

  ngOnInit(): void {
    this.storesService.getStores().subscribe(
      result => {
        this.store = result;
      });
  }

}
