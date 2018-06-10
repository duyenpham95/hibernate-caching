/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ValueStreamElementDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/value-stream-element/value-stream-element-delete-dialog.component';
import { ValueStreamElementService } from '../../../../../../main/webapp/app/entities/value-stream-element/value-stream-element.service';

describe('Component Tests', () => {

    describe('ValueStreamElement Management Delete Component', () => {
        let comp: ValueStreamElementDeleteDialogComponent;
        let fixture: ComponentFixture<ValueStreamElementDeleteDialogComponent>;
        let service: ValueStreamElementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ValueStreamElementDeleteDialogComponent],
                providers: [
                    ValueStreamElementService
                ]
            })
            .overrideTemplate(ValueStreamElementDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValueStreamElementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValueStreamElementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
