import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessibilityHelper {
  private boundHandleFocusTrap!: (e: KeyboardEvent) => void;

  trapFocus(modal: HTMLElement): void {
    modal.focus();

    this.boundHandleFocusTrap = (e: KeyboardEvent) =>
      this.handleFocusTrap(e, modal);

    document.addEventListener('keydown', this.boundHandleFocusTrap);
  }

  handleFocusTrap(e: KeyboardEvent, modal: HTMLElement) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    const focusableElements = modal.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0] as HTMLButtonElement; // get first element to be focused inside layer
    let lastFocusableElementIndex = focusableElements.length - 1;
    let lastFocusableElement = focusableElements[
      lastFocusableElementIndex
    ] as HTMLButtonElement;

    // if last focusable element is disabled then find the last focusable element which is not disabled
    while (
      (lastFocusableElement.disabled ||
        lastFocusableElement.attributes.getNamedItem('readonly')) &&
      lastFocusableElementIndex > 0
    ) {
      lastFocusableElementIndex -= 1;
      lastFocusableElement = focusableElements[
        lastFocusableElementIndex
      ] as HTMLButtonElement;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (
        document.activeElement === firstFocusableElement ||
        document.activeElement === modal
      ) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  }

  loseFocus() {
    document.removeEventListener('keydown', this.boundHandleFocusTrap);
  }
}
