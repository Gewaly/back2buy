import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Output() selectedData = new EventEmitter();

  detectChanges(event: any) {
    this.selectedData.emit(event);
  }
}
