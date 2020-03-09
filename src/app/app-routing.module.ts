import { ComponentThreeComponent } from './component-three/component-three.component';
import { ComponentTwoComponent } from './component-two/component-two.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'component-one',
    pathMatch: 'full'
  },
  {
    path: 'component-one',
    component: ComponentOneComponent
  },
  {
    path: 'component-two',
    component: ComponentTwoComponent
  },
  {
    path: 'component-three',
    component: ComponentThreeComponent
  },
  {
    path: '**',
    component: ComponentOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
