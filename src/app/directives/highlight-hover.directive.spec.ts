import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighlightHoverDirective } from './highlight-hover.directive';


@Component({
  standalone: true,
  imports: [HighlightHoverDirective],
  template: '<div appHighlightHover>Test</div>'
})
class TestComponent {}

describe('HighlightHoverDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightHoverDirective, TestComponent]  // IMPORTAR COMPONENTE
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // DETECTAR CAMBIOS
    
    // BUSCAR EL ELEMENTO CON LA DIRECTIVA
    element = fixture.debugElement.query(By.directive(HighlightHoverDirective));
  });

  it('deberia crear la directiva', () => {
    expect(element).toBeTruthy();  
  });

  it('simulamos un evento de mouse entrando', () => {
    const nativeElement = element.nativeElement;
    nativeElement.dispatchEvent(new Event('mouseenter'));

    expect(nativeElement.style.border).toBe('2px solid blue');
  });

  it('simulamos un evento de mouse saliendo', () => {
    const nativeElement = element.nativeElement;
    
    nativeElement.dispatchEvent(new Event('mouseenter'));
    expect(nativeElement.style.border).toBe('2px solid blue');

    nativeElement.dispatchEvent(new Event('mouseleave'));
    expect(nativeElement.style.border).toBe('');
  });

  it('deberia aplicar el estilo', () => {
    const nativeElement = element.nativeElement;
    nativeElement.dispatchEvent(new Event('mouseenter'));

    expect(nativeElement.style.transition).toBe('border 0.3s');
  });
});