import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Categorias } from 'src/app/models/categorias';
import { Promos } from 'src/app/models/promos';
import { PromoService } from 'src/app/services/promo.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {

  constructor(private promoService: PromoService ) { 
    this.promoService.getPromos().subscribe(
      result => {
        this.promos = result;
        this.totalCards = this.promos.length;
      });
  }

  promos: Promos[] = [];
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

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    //console.log(this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages * 10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage * 10}px) / ${this.cardsPerPage})`;
    console.log(this.cardWidth);
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
