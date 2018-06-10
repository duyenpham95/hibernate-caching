import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ValueStreamElement } from './value-stream-element.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ValueStreamElement>;

@Injectable()
export class ValueStreamElementService {

    private resourceUrl =  SERVER_API_URL + 'main/api/value-stream-elements';

    constructor(private http: HttpClient) { }

    create(valueStreamElement: ValueStreamElement): Observable<EntityResponseType> {
        const copy = this.convert(valueStreamElement);
        return this.http.post<ValueStreamElement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(valueStreamElement: ValueStreamElement): Observable<EntityResponseType> {
        const copy = this.convert(valueStreamElement);
        return this.http.put<ValueStreamElement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ValueStreamElement>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ValueStreamElement[]>> {
        const options = createRequestOption(req);
        return this.http.get<ValueStreamElement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ValueStreamElement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ValueStreamElement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ValueStreamElement[]>): HttpResponse<ValueStreamElement[]> {
        const jsonResponse: ValueStreamElement[] = res.body;
        const body: ValueStreamElement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ValueStreamElement.
     */
    private convertItemFromServer(valueStreamElement: ValueStreamElement): ValueStreamElement {
        const copy: ValueStreamElement = Object.assign({}, valueStreamElement);
        return copy;
    }

    /**
     * Convert a ValueStreamElement to a JSON which can be sent to the server.
     */
    private convert(valueStreamElement: ValueStreamElement): ValueStreamElement {
        const copy: ValueStreamElement = Object.assign({}, valueStreamElement);
        return copy;
    }
}
