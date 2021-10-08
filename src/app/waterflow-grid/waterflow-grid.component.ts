import { Component, OnInit } from '@angular/core';
import { Block } from '../interfaces/block';
import { GridColumn } from '../interfaces/grid-column';
import { GridRow } from '../interfaces/grid-row';
import { AppBroadcastService } from '../services/app-broadcast.service';
@Component({
  selector: 'app-waterflow-grid',
  templateUrl: './waterflow-grid.component.html',
  styleUrls: ['./waterflow-grid.component.scss']
})
export class WaterflowGridComponent implements OnInit {
  isStartStimulation: boolean;
  canStartStimulations: boolean;
  startRow: GridColumn[];
  endRow: GridColumn[];
  grid: GridRow[];
  blockCells: Block[];
  totalNumberOfBlocksMoved: number;
  stepsMessage: Object;
  currentStatus: string;

  constructor(public appBroadcastService: AppBroadcastService) {
    this.startRow = [];
    this.endRow = [];
    this.grid = [];
    this.isStartStimulation = false;
    this.canStartStimulations = false;
    this.totalNumberOfBlocksMoved = 0;
    this.stepsMessage = {
      SELECT: 'Drag the obstructions and place it inside grid',
      STARTED: 'Select the waterflow start point by clicking on any of the blue boxes',
      IN_PROGRESS: 'Progressing the water flow simulator',
      COMPLETED: 'Completed. Please reset to initiate again'
    };
    this.currentStatus = 'SELECT';
  }

  ngOnInit(): void {
    this.initGrid();
  }

  initGrid() {
    this.currentStatus = 'SELECT';
    this.isStartStimulation = false;
    this.canStartStimulations = false;
    this.startRow = [];
    this.endRow = [];
    this.blockCells = [];
    this.grid = [];
    this.totalNumberOfBlocksMoved = 0;
    for (let col = 0; col < this.appBroadcastService.noOfColumns; col++) {
      this.startRow.push(this.formcolumnObject(col, false, false, false));
      this.endRow.push(this.formcolumnObject(col, false, false, false));
    }
    for (let block = 0; block < this.appBroadcastService.noOfObstructions; block++) {
      this.blockCells.push({ id: block, isMoved: false });
    }
    for (let row = 0; row < this.appBroadcastService.noOfRows; row++) {
      const column = [];
      for (let col = 0; col < this.appBroadcastService.noOfColumns; col++) {
        column.push(this.formcolumnObject(col, false, false, false));
      }
      this.grid.push(this.formRowObject(row, column));
    }
  }
  goBack() {
    this.appBroadcastService.currentStep = 1;
  }
  allowDrop(event) {
    event.preventDefault();
  }
  startStimulation() {
    this.currentStatus = 'STARTED';
    this.isStartStimulation = true;
  }
  drop(event) {
    let blockCell = event.dataTransfer.getData("draggedBlock");
    this.blockCells[blockCell].isMoved = true;
    this.totalNumberOfBlocksMoved = ++this.totalNumberOfBlocksMoved;
    const rowID = event.srcElement.attributes.rowID.nodeValue;
    const columnID = event.srcElement.attributes.columnID.nodeValue;
    this.grid[rowID].column[columnID].isBlocked = true;
  }
  dragStart(event, blockCell) {
    event.dataTransfer.setData("draggedBlock", blockCell.id);
  }

  formcolumnObject(columnID, isBlocked, isVisited, isStart) {
    const column = { columnID, isBlocked, isVisited, isStart } as GridColumn;
    return column;
  }

  formRowObject(rowID, column) {
    const row = { rowID, column } as GridRow;
    return row;
  }

  startNodeSelected(cell) {
    if (this.currentStatus === 'STARTED') {
      this.currentStatus = 'IN_PROGRESS';
      cell.isVisited = true;
      this.checkBottom(-1, cell.columnID);
      this.currentStatus = 'COMPLETED';
    }
  }

  checkBottom(rowID, columnID) {
    if (rowID === (this.appBroadcastService.noOfRows - 1)) {
      this.endRow[columnID].isVisited = true;
      return;
    }
    if (this.grid[rowID + 1].column[columnID].isBlocked) {
      this.checkLeft(rowID, columnID);
      this.checkRight(rowID, columnID);
    } else {
      const nextRowId = rowID + 1;
      this.grid[nextRowId].column[columnID].isVisited = true;
      this.checkBottom(nextRowId, columnID)
    }
  }

  checkLeft(rowID, columnID) {
    const leftColumnId = columnID - 1;
    console.log(rowID, leftColumnId);
    if (leftColumnId < 0) {
      return;
    }
    if (rowID === -1) {
      if (!this.startRow[leftColumnId].isVisited) {
        this.startRow[leftColumnId].isVisited = true;
        this.checkBottom(rowID, leftColumnId);
      }
    } else if (!this.grid[rowID].column[leftColumnId].isBlocked && !this.grid[rowID].column[leftColumnId].isVisited) {
      this.grid[rowID].column[leftColumnId].isVisited = true;
      this.checkBottom(rowID, leftColumnId)
    }
  }

  checkRight(rowID, columnID) {
    const rightColumnId = columnID + 1;
    console.log(rowID, rightColumnId);
    if (rightColumnId >= this.appBroadcastService.noOfColumns) {
      return;
    }
    if (rowID === -1) {
      if (!this.startRow[rightColumnId].isVisited) {
        this.startRow[rightColumnId].isVisited = true;
        this.checkBottom(rowID, rightColumnId);
      }
    } else if (!this.grid[rowID].column[rightColumnId].isBlocked && !this.grid[rowID].column[rightColumnId].isVisited) {
      this.grid[rowID].column[rightColumnId].isVisited = true;
      this.checkBottom(rowID, rightColumnId)
    }
  }

}
