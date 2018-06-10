/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ValueStreamElementDetailComponent } from '../../../../../../main/webapp/app/entities/value-stream-element/value-stream-element-detail.component';
import { ValueStreamElementService } from '../../../../../../main/webapp/app/entities/value-stream-element/value-stream-element.service';
import { ValueStreamElement } from '../../../../../../main/webapp/app/entities/value-stream-element/value-stream-element.model';

describe('Component Tests', () => {

    describe('ValueStreamElement Management Detail Component', () => {
        let comp: ValueStreamElementDetailComponent;
        let fixture: ComponentFixture<ValueStreamElementDetailComponent>;
        let service: ValueStreamElementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ValueStreamElementDetailComponent],
                providers: [
                    ValueStreamElementService
                ]
            })
            .overrideTemplate(ValueStreamElementDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValueStreamElementDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValueStreamElementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ValueStreamElement(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.valueStreamElement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
