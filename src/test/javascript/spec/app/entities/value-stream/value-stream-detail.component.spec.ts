/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ValueStreamDetailComponent } from '../../../../../../main/webapp/app/entities/value-stream/value-stream-detail.component';
import { ValueStreamService } from '../../../../../../main/webapp/app/entities/value-stream/value-stream.service';
import { ValueStream } from '../../../../../../main/webapp/app/entities/value-stream/value-stream.model';

describe('Component Tests', () => {

    describe('ValueStream Management Detail Component', () => {
        let comp: ValueStreamDetailComponent;
        let fixture: ComponentFixture<ValueStreamDetailComponent>;
        let service: ValueStreamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ValueStreamDetailComponent],
                providers: [
                    ValueStreamService
                ]
            })
            .overrideTemplate(ValueStreamDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValueStreamDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValueStreamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ValueStream(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.valueStream).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
