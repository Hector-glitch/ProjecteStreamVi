import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LlistaVideosComponent } from './llista-videos/llista-videos.component';
import { ComprovarC2Component } from './comprovar-c2/comprovar-c2.component';

export const routes: Routes = [
  { path: '', redirectTo: '/lista-videos', pathMatch: 'full' },
  { path: 'lista-videos', component: LlistaVideosComponent },
  { path: 'client2', component: ComprovarC2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
