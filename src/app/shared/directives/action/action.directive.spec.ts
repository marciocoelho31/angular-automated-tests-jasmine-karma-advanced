import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe(ActionDirective.name, () => {
    let fixture: ComponentFixture<ActionDirectiveTestComponent>;
    let component: ActionDirectiveTestComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActionDirectiveTestComponent],
            imports: [ActionDirectiveModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ActionDirectiveTestComponent);
        component = fixture.componentInstance;

    });

    it(`(D) (@Output appAction) should emit event with payload when Enter key is pressed`, () => {

        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const keyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
        divEl.dispatchEvent(keyboardEvent);
        
        expect(component.hasEvent()).toBeTrue();
    });

    it(`(D) (@Output appAction) should emit event with payload when clicked`, () => {

        //const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        // usando debugElement
        const divEl = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
        const event = new Event('click');
        divEl.dispatchEvent(event);
        
        expect(component.hasEvent()).toBeTrue();
    });

    // nao recomendado unir 2 testes diferentes no mesmo it
    it(`(D) (@Output appAction) should emit event with payload when clicked or Enter key pressed`, () => {
        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');

        const keyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
        divEl.dispatchEvent(keyboardEvent);
        expect(component.hasEvent()).withContext('KeyboardEvent').toBeTrue();
        component.resetForNewExpectation();

        const clickEvent = new Event('click');
        divEl.dispatchEvent(clickEvent);
        expect(component.hasEvent()).withContext('ClickEvent').toBeTrue();
    });

});

@Component({
    template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
    private event: Event = null;
    public actionHandler(event: Event): void {
        this.event = event;
    }
    public hasEvent(): boolean {
        return !!this.event;    // !! converte direto para boolean
    }
    public resetForNewExpectation(): void {
        this.event = null;
    }
}