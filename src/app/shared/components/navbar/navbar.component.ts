import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  role: 'Instructor' | 'Estudiante' | null = null;
  username: string | null = null;
  isDropdownOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    const decoded = this.authService.getDecodedToken();
    if (decoded) {
      this.role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.username = decoded.unique_name;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isDropdownOpen = false;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isDropdownOpen = false;
    window.location.href = '/';
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('nav') && this.isMenuOpen) {
      this.closeMenu();
    }

    if (!target.closest('.relative') && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
}