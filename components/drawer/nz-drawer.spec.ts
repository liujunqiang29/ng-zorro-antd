import {
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayContainer } from '@angular/cdk/overlay';
import { NzDrawerComponent } from './nz-drawer.component';
import { NzDrawerModule } from './nz-drawer.module';

describe('NzDrawerComponent', () => {
  let component: NzTestDrawerComponent;
  let fixture: ComponentFixture<NzTestDrawerComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzDrawerModule ],
      declarations: [ NzTestDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    component.close();
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(component.drawerComponent.nzVisible).toBe(true);
  });

  it('should close work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    component.close();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(false);
    expect(component.drawerComponent.nzVisible).toBe(false);
  });

  it('should hied close button', () => {
    component.closable = false;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close')).toBe(null);

  });

  it('should closable', () => {
    component.closable = true;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close') as HTMLElement).click();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(false);
  });

  it('should not close when click mask', () => {
    component.maskClosable = false;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
  });

  it('should close when click mask', () => {
    component.maskClosable = true;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(false);
  });

  it('should not show mask', () => {
    component.showMask = false;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask')).toBe(null);
    component.showMask = true;
    fixture.detectChanges();
  });

  it('should set nzMaskStyle & nzBodyStyle', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).style.color).toBe('gray');
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-body') as HTMLElement).style.color).toBe('gray');
  });

  it('should not render title', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-header')).toBe(null);
  });

  it('should support string title', () => {
    component.title = component.stringTitle;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title') as HTMLElement).innerText.trim()).toBe('test');
  });

  it('should support TemplateRef title', () => {
    component.title = component.templateTitle;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title .custom-title')).not.toBe(null);
  });

  it('should support custom width', () => {
    component.width = '300px';
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content > div') as HTMLElement).getBoundingClientRect().width).toBe(300);
  });

  it('should support custom number type width', () => {
    component.width = 500;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content > div') as HTMLElement).getBoundingClientRect().width).toBe(500);
  });

  it('should nzWrapClassName work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement).classList.contains('test-class')).toBe(true);
  });

  it('should nzZIndex work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).style.zIndex).toBe('1001');
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement).style.zIndex).toBe('1001');
  });

  it('should nzPlacement work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')).toBe(true);
    component.placement = 'right';
    fixture.detectChanges();
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')).toBe(true);
    component.close();
    fixture.detectChanges();
  });

  it('should nzOffsetX work', () => {
    component.open();
    component.placement = 'left';
    component.width = '300px';
    component.offsetX = 100;
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement).style.transform).toBe('translateX(100px)');
    fixture.detectChanges();
    component.placement = 'right';
    component.offsetX = 100;
    fixture.detectChanges();
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement).style.transform).toBe('translateX(-100px)');
    component.close();
    fixture.detectChanges();
  });

});

@Component({
  selector: 'nz-demo-modal-async',
  template: `
    <button (click)="open()">Open</button>
    <ng-template #customTitle><span class="custom-title">title</span></ng-template>
    <nz-drawer
      [nzMaskStyle]="{ color: 'gray' }"
      [nzBodyStyle]="{ color: 'gray' }"
      [nzMaskClosable]="maskClosable"
      [nzWrapClassName]="'test-class'"
      [nzZIndex]="1001"
      [nzClosable]="closable"
      [nzMask]="showMask"
      [nzVisible]="visible"
      [nzWidth]="width"
      [nzPlacement]="placement"
      [nzTitle]="title"
      [nzOffsetX]="offsetX"
      (nzOnClose)="close()">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </nz-drawer>
  `,
  styles: []
})
class NzTestDrawerComponent {
  visible = false;
  closable = true;
  maskClosable = true;
  showMask = true;
  title = null;
  stringTitle = 'test';
  width: string | number = '300px';
  placement = 'left';
  offsetX = 0;
  @ViewChild('customTitle') templateTitle: TemplateRef<void>;

  @ViewChild(NzDrawerComponent) drawerComponent: NzDrawerComponent;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
