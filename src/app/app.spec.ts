import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('muestra el título de la práctica', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(h1?.textContent).toContain('Práctica 4 CI/CD');
  });

  it('añade a la lista la tarea enviada desde el formulario', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'Tarea desde la app';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();

    expect(el.querySelectorAll('li').length).toBe(1);
    expect(el.querySelector('li .titulo')?.textContent).toContain('Tarea desde la app');
  });
});
