import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor() {}

  ngAfterViewInit() {
    this.sidenav.mode = 'over';
    this.sidenav.close();
  }
}
