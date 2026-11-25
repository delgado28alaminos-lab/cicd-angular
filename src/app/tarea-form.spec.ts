import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaForm } from './tarea-form';

describe('TareaForm', () => {
  let fixture: ComponentFixture<TareaForm>;
  let el: HTMLElement;
  let emitidas: string[];

  const input = () => el.querySelector('input') as HTMLInputElement;
  const boton = () => el.querySelector('button') as HTMLButtonElement;

  function escribir(texto: string): void {
    input().value = texto;
    input().dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function enviar(): void {
    el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TareaForm] }).compileComponents();
    fixture = TestBed.createComponent(TareaForm);
    el = fixture.nativeElement;
    emitidas = [];
    fixture.componentInstance.nueva.subscribe((valor) => emitidas.push(valor));
    fixture.detectChanges();
  });

  it('deshabilita el botón mientras el texto está vacío', () => {
    expect(boton().disabled).toBe(true);
    escribir('   ');
    expect(boton().disabled).toBe(true);
    escribir('Algo');
    expect(boton().disabled).toBe(false);
  });

  it('emite la tarea sin espacios y limpia el campo al enviar', () => {
    escribir('  Comprar pan  ');
    enviar();

    expect(emitidas).toEqual(['Comprar pan']);
    expect(fixture.componentInstance.texto()).toBe('');
    expect(input().value).toBe('');
  });

  it('no emite nada si se envía vacío', () => {
    enviar();
    expect(emitidas).toEqual([]);
  });
});
