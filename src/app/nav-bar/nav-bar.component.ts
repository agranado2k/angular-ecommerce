import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isExpanded: boolean;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
