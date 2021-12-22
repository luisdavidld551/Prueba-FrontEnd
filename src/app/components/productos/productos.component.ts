import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Stores } from 'src/app/models/stores';
import { Productos } from 'src/app/models/productos';
import { StoresService } from 'src/app/services/stores.service';
import { NgbAlert, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @ViewChild('contenido') contenido!: TemplateRef<any>;
  @ViewChild('staticAlert', { static: false }) staticAlert!: NgbAlert;
  @Input() storesProduct: string = "";

  cantidad:number = 0;
  typeAler: string = "warning";
  toggoleShowHide: string = "none";
  staticAlertClosed = true;
  store: Stores[] = [];
  storeLocal: Stores[] = [
    {
      "id": 1,
      "name": "Camachos's Burger",
      "location": "Cabecera",
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1XzwrBeU1IMvQf3RNenCwuaFxVOvKL-CD=w1436-h946-iv1",
      "labels": [
        "Hamburgesa"
      ]
    },
    {
      "id": 2,
      "name": "Burger",
      "location": "Cabecera",
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1XzwrBeU1IMvQf3RNenCwuaFxVOvKL-CD=w1436-h946-iv1",
      "labels": [
        "Hamburgesa"
      ]
    }, {
      "id": 3,
      "name": "Camachos",
      "location": "Cabecera",
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1XzwrBeU1IMvQf3RNenCwuaFxVOvKL-CD=w1436-h946-iv1",
      "labels": [
        "Hamburgesa"
      ]
    }
  ];
  producto: Productos[] = [];
  producto2: Productos[] = [
    {
      "id": 1,
      "name": "Hot Box Rela",
      "location": "Cabecera",
      "storeId": 3,
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1Q7yj8RURVP5imrC0jeNGmVPD5wb-eYdq=w1165-h948-iv1",
      "price": 18000,
      "description": "Quisque finibus, lacus cursus faucibus cursus, dui nisl convallis libero, et ultricies augue purus in dolor. Donec tellus nulla, ullamcorper et viverra in, faucibus sit amet odio."
    },
    {
      "id": 2,
      "name": "Hot Box Rela",
      "location": "Cabecera",
      "storeId": 1,
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1Q7yj8RURVP5imrC0jeNGmVPD5wb-eYdq=w1165-h948-iv1",
      "price": 18000,
      "description": "Quisque finibus, lacus cursus faucibus cursus, dui nisl convallis libero, et ultricies augue purus in dolor. Donec tellus nulla, ullamcorper et viverra in, faucibus sit amet odio."
    },
    {
      "id": 3,
      "name": "Hot Box Rela",
      "location": "Cabecera",
      "storeId": 2,
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1Q7yj8RURVP5imrC0jeNGmVPD5wb-eYdq=w1165-h948-iv1",
      "price": 18000,
      "description": "Quisque finibus, lacus cursus faucibus cursus, dui nisl convallis libero, et ultricies augue purus in dolor. Donec tellus nulla, ullamcorper et viverra in, faucibus sit amet odio."
    }, {
      "id": 5,
      "name": "Hot Box Rela",
      "location": "Cabecera",
      "storeId": 2,
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1Q7yj8RURVP5imrC0jeNGmVPD5wb-eYdq=w1165-h948-iv1",
      "price": 18000,
      "description": "Quisque finibus, lacus cursus faucibus cursus, dui nisl convallis libero, et ultricies augue purus in dolor. Donec tellus nulla, ullamcorper et viverra in, faucibus sit amet odio."
    }, {
      "id": 11,
      "name": "Hot Box Rela",
      "location": "Cabecera",
      "storeId": 3,
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1Q7yj8RURVP5imrC0jeNGmVPD5wb-eYdq=w1165-h948-iv1",
      "price": 18000,
      "description": "Quisque finibus, lacus cursus faucibus cursus, dui nisl convallis libero, et ultricies augue purus in dolor. Donec tellus nulla, ullamcorper et viverra in, faucibus sit amet odio."
    },
    {
      "id": 12,
      "name": "Hot Box Rela",
      "location": "Cabecera",
      "storeId": 1,
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1Q7yj8RURVP5imrC0jeNGmVPD5wb-eYdq=w1165-h948-iv1",
      "price": 18000,
      "description": "Quisque finibus, lacus cursus faucibus cursus, dui nisl convallis libero, et ultricies augue purus in dolor. Donec tellus nulla, ullamcorper et viverra in, faucibus sit amet odio."
    },
    {
      "id": 13,
      "name": "Hot Box Rela",
      "location": "Cabecera",
      "storeId": 1,
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1Q7yj8RURVP5imrC0jeNGmVPD5wb-eYdq=w1165-h948-iv1",
      "price": 18000,
      "description": "Quisque finibus, lacus cursus faucibus cursus, dui nisl convallis libero, et ultricies augue purus in dolor. Donec tellus nulla, ullamcorper et viverra in, faucibus sit amet odio."
    }, {
      "id": 15,
      "name": "Hot Box Rela",
      "location": "Cabecera",
      "storeId": 2,
      "rating": 4.5,
      "picture": "https://lh3.google.com/u/0/d/1Q7yj8RURVP5imrC0jeNGmVPD5wb-eYdq=w1165-h948-iv1",
      "price": 18000,
      "description": "Quisque finibus, lacus cursus faucibus cursus, dui nisl convallis libero, et ultricies augue purus in dolor. Donec tellus nulla, ullamcorper et viverra in, faucibus sit amet odio."
    }
  ];

  showProductos: Productos[] = [];
  store2: Stores[] = [];

  idTienda = 0;

  constructor(private storesService: StoresService, private config: NgbModalConfig, private modal: NgbModal) {
  }
  
  open() {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.modal.open(this.contenido, { size: 'lg' });
  }
  ngOnInit(): void {
    this.storesService.getStores().subscribe(
      result => {
        this.store = result;
        this.recorrerTiendas(this.storesProduct);

      },
      err => {
        this.typeAler = "warning";
        this.toggoleShowHide = "none";
        this.changeSuccessMessage();
      },
      () => console.log('HTTP request completed.'));
  }

  recorrerTiendas(tienda: string) {
    for (let clave of this.store) {
      if (clave.name == tienda) {
        this.idTienda = clave.id;
        this.store2.push(clave);
        console.log(this.idTienda);
        console.log(this.store2);
        this.recorrerProductos();
      }
    }
  }

  recorrerProductos() {
    this.storesService.getProductos().subscribe(
      result => {
        this.producto = result;
        for (let clave of this.producto) {
          if (clave.storeId == this.idTienda) {
            this.showProductos.push(clave);
            console.log("Hola");
          }
        }
        this.cantidad = this.showProductos.length;
        this.open();
        console.log(this.showProductos.length);
        console.log(this.showProductos);
      },
      err => {
        this.typeAler = "warning";
        this.toggoleShowHide = "none";
        this.changeSuccessMessage();
      },
      () => console.log('HTTP request completed.'));
      
  }

  changeSuccessMessage() {
    this.staticAlertClosed = false;
    setTimeout(() => this.staticAlert.close(), 5000);
  }

  modalClose() {
    this.storesProduct = "";
    this.store = [];
    this.cantidad = 0;
    this.modal.dismissAll();
  }
}
