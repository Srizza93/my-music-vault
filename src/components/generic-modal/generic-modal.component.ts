import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
  imports: [MatButtonModule, MatIcon, CommonModule],
})
export class GenericModalComponent {
  @Input() modalTitle: string = '';
  @Output() closeEvent = new EventEmitter<void>();

  closeModal() {
    this.closeEvent.emit();
  }
}
