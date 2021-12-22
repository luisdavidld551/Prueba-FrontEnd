import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Categorias } from 'src/app/models/categorias';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private categoriasService: CategoriasService ) { 
    this.categoriasService.getCategorias().subscribe(
      result => {
        this.categoria = result;
        this.totalCards = this.categoria.length;
      });
  }
  variableStilo: number = 0;
  algo:string=";"
  categoria: Categorias[] = [];
  totalCards: number = 4;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number = 0;
  totalPages: number = 0;
  overflowWidth: string = "";
  cardWidth: string = "";
  containerWidth: number = 0;
  @ViewChild("container", { static: true, read: ElementRef }) container!: ElementRef;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }
  
  ngOnInit() {   
      this.cardsPerPage = this.getCardsPerPage();
      this.initializeSlider();
  }

  colorStyle(id:number){
    if( this.variableStilo == id){
      this.variableStilo = 0;
    }else{
      this.variableStilo = id;
      console.log(this.variableStilo);
      console.log(id);
    }
    
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages * 10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage * 10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 250);
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
  }

}
