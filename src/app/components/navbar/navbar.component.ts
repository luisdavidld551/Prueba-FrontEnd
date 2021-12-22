import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public isMenuCollapsed = true;
  public isSignedIn2: any = [];
  nombre:string="Joan Pava";
  constructor(private userServices: UsersService){
    
    }

  ngOnInit(): void {
      this.isSignedIn2 = this.userServices.getUserHome();    
  }

}
