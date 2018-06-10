/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ValueStreamTagDetailComponent } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag-detail.component';
import { ValueStreamTagService } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag.service';
import { ValueStreamTag } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag.model';

describe('Component Tests', () => {

    describe('ValueStreamTag Management Detail Component', () => {
        let comp: ValueStreamTagDetailComponent;
        let fixture: ComponentFixture<ValueStreamTagDetailComponent>;
        let service: ValueStreamTagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ValueStreamTagDetailComponent],
                providers: [
                    ValueStreamTagService
                ]
            })
            .overrideTemplate(ValueStreamTagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValueStreamTagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValueStreamTagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ValueStreamTag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.valueStreamTag).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
