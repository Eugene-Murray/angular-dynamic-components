import { NgComponentOutlet } from '@angular/common';
import { Component, inject, ViewContainerRef } from '@angular/core';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';

@Component({
  selector: 'app-root',
  imports: [NgComponentOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-dynamic-components';
  dynamicComponent = Component1Component;
  lazyLoadComponent: any = null;

  private viewContainer = inject(ViewContainerRef);

  onloadComponentViewContainer() {
    this.viewContainer.createComponent(Component2Component);
  }

  async onlazyLoadComponent() {
    const { Component3Component } = await import('./components/component3/component3.component');
    this.lazyLoadComponent = Component3Component;
  }

}
