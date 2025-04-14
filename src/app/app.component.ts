import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-primeng-app';
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Masquer navbar sur /login et /register
        this.showNavbar = !['/login', '/register'].includes(event.urlAfterRedirects);
      }
    });
  }

  get isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/login' || url === '/register';
  }


}
