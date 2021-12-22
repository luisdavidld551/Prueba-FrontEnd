import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre:string="Juan";
  tienda:string="";
  nameBuscar:string="";
  constructor() { }

  ngOnInit(): void {
  }
  buscarTienda2(){
    this.tienda = "";
  }
  buscarTienda(){
    this.tienda = this.nameBuscar;
  }

}
