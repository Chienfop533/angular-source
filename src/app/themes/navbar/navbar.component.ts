import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  currentUser: any = { fullName: 'Người dùng', email: 'user@gmail.com' };
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const claims: any = this.authService.identityClaims;
    if (claims) {
      if (claims['family_name']) {
        this.currentUser.fullName = claims['family_name'] + ' ' + claims['given_name'];
      } else {
        this.currentUser.fullName = claims['given_name'];
      }
      this.currentUser.email = claims['email'];
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const userMenu = document.querySelector('.user-menu');
    if (userMenu && !userMenu.contains(target)) {
      this.closeDropdown();
    }
  }
}
