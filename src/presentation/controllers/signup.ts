import {HttpResponse, HttpRequest, Controller} from '../protocols'
import {MissingParamError, InvalidParamError} from '../errors';
import {badRequest, serverError} from '../helpers/http-helper'
import {EmailValidator} from '../protocols/email-validator'

export class SignupController implements Controller{
    private readonly emailValidator:EmailValidator

    constructor (emailValidator: EmailValidator){
        this.emailValidator = emailValidator;
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        try{
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            //simplificando o httprequest.body
            const {email, password, passwordConfirmation} = httpRequest.body
            if(password !== passwordConfirmation){
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
            const isValid = this.emailValidator.isValid(email);
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        }catch(error){
            return serverError();
        }
    }
}