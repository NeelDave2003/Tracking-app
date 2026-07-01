import { Observable } from 'rxjs';

export interface HelloResponse {
    message: string;
}

export interface UserGrpcService {
    getHello(data: {}): Observable<HelloResponse>;
}