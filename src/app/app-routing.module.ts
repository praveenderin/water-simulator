import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridCreationComponent } from './grid-creation/grid-creation.component';
import { WaterflowGridComponent } from './waterflow-grid/waterflow-grid.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
