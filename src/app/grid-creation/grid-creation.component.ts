import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppBroadcastService } from '../services/app-broadcast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-creation',
  templateUrl: './grid-creation.component.html',
  styleUrls: ['./grid-creation.component.scss']
})
export class GridCreationComponent implements OnInit {
  gridCreationform: FormGroup;

  constructor(public appBroadcastService: AppBroadcastService, public router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.gridCreationform = new FormGroup({
      rows: new FormControl(this.appBroadcastService.noOfRows),
      columns: new FormControl(this.appBroadcastService.noOfColumns),
      obstructions: new FormControl(this.appBroadcastService.noOfObstructions)
    });
  }

  goNext() {
    const controls = this.gridCreationform.controls;
    this.appBroadcastService.noOfRows = controls.rows.value;
    this.appBroadcastService.noOfColumns = controls.columns.value;
    this.appBroadcastService.noOfObstructions = controls.obstructions.value;
    this.appBroadcastService.currentStep = 2;
  }
}
