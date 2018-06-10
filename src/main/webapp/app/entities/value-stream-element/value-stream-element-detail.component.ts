import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ValueStreamElement } from './value-stream-element.model';
import { ValueStreamElementService } from './value-stream-element.service';

@Component({
    selector: 'jhi-value-stream-element-detail',
    templateUrl: './value-stream-element-detail.component.html'
})
export class ValueStreamElementDetailComponent implements OnInit, OnDestroy {

    valueStreamElement: ValueStreamElement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private valueStreamElementService: ValueStreamElementService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInValueStreamElements();
    }

    load(id) {
        this.valueStreamElementService.find(id)
            .subscribe((valueStreamElementResponse: HttpResponse<ValueStreamElement>) => {
                this.valueStreamElement = valueStreamElementResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInValueStreamElements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'valueStreamElementListModification',
            (response) => this.load(this.valueStreamElement.id)
        );
    }
}
