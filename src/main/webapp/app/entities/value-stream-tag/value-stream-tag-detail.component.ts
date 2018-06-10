import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ValueStreamTag } from './value-stream-tag.model';
import { ValueStreamTagService } from './value-stream-tag.service';

@Component({
    selector: 'jhi-value-stream-tag-detail',
    templateUrl: './value-stream-tag-detail.component.html'
})
export class ValueStreamTagDetailComponent implements OnInit, OnDestroy {

    valueStreamTag: ValueStreamTag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private valueStreamTagService: ValueStreamTagService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInValueStreamTags();
    }

    load(id) {
        this.valueStreamTagService.find(id)
            .subscribe((valueStreamTagResponse: HttpResponse<ValueStreamTag>) => {
                this.valueStreamTag = valueStreamTagResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInValueStreamTags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'valueStreamTagListModification',
            (response) => this.load(this.valueStreamTag.id)
        );
    }
}
