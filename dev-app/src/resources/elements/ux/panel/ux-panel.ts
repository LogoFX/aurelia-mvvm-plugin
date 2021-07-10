import { StyleEngine } from '@aurelia-ux/core';
import { bindable, inject } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';
import { UxPanelTheme } from './ux-panel-theme';

@inject(Element, StyleEngine)
@customElement('ux-panel')
export class UxPanel {

  @bindable public theme: UxPanelTheme;

  constructor(private element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
    
  }

  private themeChanged(newValue: any) {
    this.styleEngine.applyTheme(newValue, this.element);
  }
}
