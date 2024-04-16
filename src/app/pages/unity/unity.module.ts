import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UnityComponent } from './unity.component';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: UnityComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [UnityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class UnityModule { }
