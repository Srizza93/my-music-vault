import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AccessibilityHelper } from '@/helpers/accessibility.helper';

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
  imports: [MatButtonModule, MatIcon, CommonModule],
})
export class GenericModalComponent {
  @Input() modalTitle: string = '';
  @Output() closeEvent = new EventEmitter<void>();

  @ViewChild('modalContent') modalContentElement!: ElementRef<HTMLElement>;

  constructor(private accessibilityHelper: AccessibilityHelper) {
    this.accessibilityHelper = accessibilityHelper;
  }

  closeModal() {
    this.closeEvent.emit();
  }

  ngAfterViewInit() {
    if (this.modalContentElement) {
      this.accessibilityHelper.trapFocus(
        this.modalContentElement.nativeElement
      );
    }
  }

  ngOnDestroy() {
    this.accessibilityHelper.loseFocus();
  }
}
