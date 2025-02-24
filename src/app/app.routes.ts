import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LlistaVideosComponent } from './llista-videos/llista-videos.component';
import {LoginComponent} from './login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: '/lista-videos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'lista-videos', component: LlistaVideosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
