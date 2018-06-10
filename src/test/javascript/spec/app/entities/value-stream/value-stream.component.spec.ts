/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ValueStreamComponent } from '../../../../../../main/webapp/app/entities/value-stream/value-stream.component';
import { ValueStreamService } from '../../../../../../main/webapp/app/entities/value-stream/value-stream.service';
import { ValueStream } from '../../../../../../main/webapp/app/entities/value-stream/value-stream.model';

describe('Component Tests', () => {

    describe('ValueStream Management Component', () => {
        let comp: ValueStreamComponent;
        let fixture: ComponentFixture<ValueStreamComponent>;
        let service: ValueStreamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ValueStreamComponent],
                providers: [
                    ValueStreamService
                ]
            })
            .overrideTemplate(ValueStreamComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValueStreamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValueStreamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ValueStream(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.valueStreams[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
