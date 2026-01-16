import { Routes } from '@angular/router';
import { LayoutComponent } from './themes/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'conversations',
        component: ConversationsComponent,
      },
    ],
  },
];
