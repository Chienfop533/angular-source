import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './common/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
