import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GridCreationComponent } from './grid-creation/grid-creation.component';
import { WaterflowGridComponent } from './waterflow-grid/waterflow-grid.component';
import { AppBroadcastService } from './services/app-broadcast.service'

@NgModule({
  declarations: [
    AppComponent,
    GridCreationComponent,
    WaterflowGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AppBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
