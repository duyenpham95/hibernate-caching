import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ValueStreamElement } from './value-stream-element.model';
import { ValueStreamElementService } from './value-stream-element.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-value-stream-element',
    templateUrl: './value-stream-element.component.html'
})
export class ValueStreamElementComponent implements OnInit, OnDestroy {
valueStreamElements: ValueStreamElement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private valueStreamElementService: ValueStreamElementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.valueStreamElementService.query().subscribe(
            (res: HttpResponse<ValueStreamElement[]>) => {
                this.valueStreamElements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInValueStreamElements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ValueStreamElement) {
        return item.id;
    }
    registerChangeInValueStreamElements() {
        this.eventSubscriber = this.eventManager.subscribe('valueStreamElementListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
