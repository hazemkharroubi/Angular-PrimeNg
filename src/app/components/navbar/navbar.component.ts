import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private route: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Products',
        icon: 'pi pi-shopping-cart',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            routerLink: '/products/new'
          },
          {
            label: 'List',
            icon: 'pi pi-list',
            routerLink: '/products'
          }
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact'
      },
    ];
  }


  logOut() {
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }
}
