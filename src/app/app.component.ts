import { CommonModule, NgComponentOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import {
  Portal,
  ComponentPortal,
  TemplatePortal,
  DomPortal,
  PortalModule,
} from '@angular/cdk/portal';
import { Component4Component } from './components/component4/component4.component';
import { DynamicModule } from 'ng-dynamic-component';
import { Component5Component } from './components/component5/component5.component';
import { Component6Component } from './components/component6/component6.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, NgComponentOutlet, PortalModule, DynamicModule],
})
export class AppComponent {
  title = 'angular-dynamic-components';
  dynamicComponent = Component1Component;
  lazyLoadComponent: any = null;

  private viewContainer = inject(ViewContainerRef);
  private _viewContainerRef = inject(ViewContainerRef);

  @ViewChild('templatePortalContent') templatePortalContent:
    | TemplateRef<unknown>
    | undefined;
  @ViewChild('domPortalContent') domPortalContent:
    | ElementRef<HTMLElement>
    | undefined;

  selectedPortal: Portal<any> | undefined;
  componentPortal: ComponentPortal<Component4Component> | undefined;
  templatePortal: TemplatePortal<any> | undefined;
  domPortal: DomPortal<any> | undefined;

  ndcDynamic = Math.random() > 0.5 ? Component5Component : Component6Component;

  onloadComponentViewContainer() {
    this.viewContainer.createComponent(Component2Component);
  }

  async onlazyLoadComponent() {
    const { Component3Component } = await import(
      './components/component3/component3.component'
    );
    this.lazyLoadComponent = Component3Component;
  }

  

  ngAfterViewInit() {
    this.componentPortal = new ComponentPortal(Component4Component);
    if (this.templatePortalContent) {
      this.templatePortal = new TemplatePortal(
        this.templatePortalContent,
        this._viewContainerRef
      );
    }
    if (this.domPortalContent) {
      this.domPortal = new DomPortal(this.domPortalContent);
    }
  }
}
