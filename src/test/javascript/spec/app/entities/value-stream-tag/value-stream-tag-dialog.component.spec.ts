/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ValueStreamTagDialogComponent } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag-dialog.component';
import { ValueStreamTagService } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag.service';
import { ValueStreamTag } from '../../../../../../main/webapp/app/entities/value-stream-tag/value-stream-tag.model';
import { ValueStreamService } from '../../../../../../main/webapp/app/entities/value-stream';

describe('Component Tests', () => {

    describe('ValueStreamTag Management Dialog Component', () => {
        let comp: ValueStreamTagDialogComponent;
        let fixture: ComponentFixture<ValueStreamTagDialogComponent>;
        let service: ValueStreamTagService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ValueStreamTagDialogComponent],
                providers: [
                    ValueStreamService,
                    ValueStreamTagService
                ]
            })
            .overrideTemplate(ValueStreamTagDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValueStreamTagDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValueStreamTagService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ValueStreamTag(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.valueStreamTag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'valueStreamTagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ValueStreamTag();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.valueStreamTag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'valueStreamTagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
