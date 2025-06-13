import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  showNavbar = true;

  private routerEventsSub!: Subscription;
  private logoutCheckSub!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.routerEventsSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hideOn = ['/login', '/registro'];
        this.showNavbar = !hideOn.includes(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.logoutCheckSub = interval(60 * 1000).subscribe(() => {
      const token = this.authService.getToken();
      const isLoggedIn = this.authService.isLoggedIn();

      if (token && !isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSub.unsubscribe();
    this.logoutCheckSub.unsubscribe();
  }
}