import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ValueStream } from './value-stream.model';
import { ValueStreamPopupService } from './value-stream-popup.service';
import { ValueStreamService } from './value-stream.service';

@Component({
    selector: 'jhi-value-stream-dialog',
    templateUrl: './value-stream-dialog.component.html'
})
export class ValueStreamDialogComponent implements OnInit {

    valueStream: ValueStream;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private valueStreamService: ValueStreamService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.valueStream, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.valueStream.id !== undefined) {
            this.subscribeToSaveResponse(
                this.valueStreamService.update(this.valueStream));
        } else {
            this.subscribeToSaveResponse(
                this.valueStreamService.create(this.valueStream));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ValueStream>>) {
        result.subscribe((res: HttpResponse<ValueStream>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ValueStream) {
        this.eventManager.broadcast({ name: 'valueStreamListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-value-stream-popup',
    template: ''
})
export class ValueStreamPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valueStreamPopupService: ValueStreamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.valueStreamPopupService
                    .open(ValueStreamDialogComponent as Component, params['id']);
            } else {
                this.valueStreamPopupService
                    .open(ValueStreamDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
