/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ValueStreamTagComponent } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag.component';
import { ValueStreamTagService } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag.service';
import { ValueStreamTag } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag.model';

describe('Component Tests', () => {

    describe('ValueStreamTag Management Component', () => {
        let comp: ValueStreamTagComponent;
        let fixture: ComponentFixture<ValueStreamTagComponent>;
        let service: ValueStreamTagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ValueStreamTagComponent],
                providers: [
                    ValueStreamTagService
                ]
            })
            .overrideTemplate(ValueStreamTagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValueStreamTagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValueStreamTagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ValueStreamTag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.valueStreamTags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
