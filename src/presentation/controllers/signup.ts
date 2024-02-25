import {HttpResponse, httpRequest} from '../protocols/http'
import {MissingParamError} from '../errors/missing-param-error';

export class SignupController {
    handle(httpRequest: any): any {

        if (!httpRequest.body.name) {
            return {
                statusCode: 400,
                body: new MissingParamError('name')
            }
        }
        if (!httpRequest.body.email) {
            return {
                statusCode: 400,
                body: new MissingParamError('email')
            }
        }

    }
}