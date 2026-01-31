import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, FooterComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent { }
