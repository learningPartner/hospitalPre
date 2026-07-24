import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  imports: [JsonPipe],
  templateUrl: './custom-table.html',
  styleUrl: './custom-table.css',
})
export class CustomTable {


  @Input() columnList: string[] = [];

  @Input() gridData: any[] = [];

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();



  onEditRecord(data:any) {
    debugger;
    this.onEdit.emit(data)
  }

  onDeleteRecord(data:any) {
    this.onDelete.emit(data);
  }




}
