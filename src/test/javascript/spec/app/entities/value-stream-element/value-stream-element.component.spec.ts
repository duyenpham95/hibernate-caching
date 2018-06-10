/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ValueStreamElementComponent } from '../../../../../../main/webapp/app/entities/value-stream-element/value-stream-element.component';
import { ValueStreamElementService } from '../../../../../../main/webapp/app/entities/value-stream-element/value-stream-element.service';
import { ValueStreamElement } from '../../../../../../main/webapp/app/entities/value-stream-element/value-stream-element.model';

describe('Component Tests', () => {

    describe('ValueStreamElement Management Component', () => {
        let comp: ValueStreamElementComponent;
        let fixture: ComponentFixture<ValueStreamElementComponent>;
        let service: ValueStreamElementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ValueStreamElementComponent],
                providers: [
                    ValueStreamElementService
                ]
            })
            .overrideTemplate(ValueStreamElementComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValueStreamElementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValueStreamElementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ValueStreamElement(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.valueStreamElements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
