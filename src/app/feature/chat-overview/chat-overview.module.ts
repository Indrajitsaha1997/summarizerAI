import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SummarizerBotComponent } from './summarizer-bot/summarizer-bot.component';

const routes: Routes = [
  { path: 'summarizer-ai', component: SummarizerBotComponent },
  {
    path: '**',
    redirectTo: 'summarizer-ai',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatOverviewModule {}
