import {HttpResponse, httpRequest} from '../protocols/http'
import {MissingParamError} from '../errors/missing-param-error';
import {badRequest} from '../helpers/http-helper'

export class SignupController {
    handle(httpRequest: httpRequest): HttpResponse {
        if (!httpRequest.body.name) {
            return badRequest(new MissingParamError('name'))
        }    
        if (!httpRequest.body.email) {
            return badRequest(new MissingParamError('email'))
        }

        const requiredFields = ['name', 'email']
        for(const field of requiredFields){
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }   

        }




    }
}