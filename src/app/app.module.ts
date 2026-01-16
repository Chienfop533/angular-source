import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './common/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';
import { ConversationsDetailComponent } from './pages/conversations/conversations-detail/conversations-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [RouterModule, SharedModule, ModalModule.forRoot()],
  declarations: [
    HomeComponent,
    ConversationsComponent,
    ConversationsDetailComponent,
  ],
})
export class AppModule {}
