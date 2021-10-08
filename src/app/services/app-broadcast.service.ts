import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppBroadcastService {
  public noOfRows: number = 5;
  public noOfColumns: number = 5;
  public noOfObstructions: number = 3;
  public currentStep: number = 1;
  
  constructor() { }
}
