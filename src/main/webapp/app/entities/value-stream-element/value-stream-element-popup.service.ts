import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ValueStreamElement } from './value-stream-element.model';
import { ValueStreamElementService } from './value-stream-element.service';

@Injectable()
export class ValueStreamElementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private valueStreamElementService: ValueStreamElementService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.valueStreamElementService.find(id)
                    .subscribe((valueStreamElementResponse: HttpResponse<ValueStreamElement>) => {
                        const valueStreamElement: ValueStreamElement = valueStreamElementResponse.body;
                        this.ngbModalRef = this.valueStreamElementModalRef(component, valueStreamElement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.valueStreamElementModalRef(component, new ValueStreamElement());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    valueStreamElementModalRef(component: Component, valueStreamElement: ValueStreamElement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.valueStreamElement = valueStreamElement;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
