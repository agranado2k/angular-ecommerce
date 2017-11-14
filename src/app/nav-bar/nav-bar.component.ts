import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent {
  isExpanded: boolean;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
