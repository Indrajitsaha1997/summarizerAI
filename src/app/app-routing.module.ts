import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'summarizer-ai',
    loadChildren: () =>
      import('./feature/chat-overview/chat-overview.module').then(
        (m) => m.ChatOverviewModule
      ),
  },
  {
    path: '**',
    redirectTo: 'summarizer-ai',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
