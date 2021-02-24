import SwaggerParser from '@apidevtools/swagger-parser'
import Ajv from 'ajv'

export function loadAPIspec(){
    return SwaggerParser.dereference('http://localhost/v2/swagger.json')
}

export function validate(schema: any, body: any){
    const ajv = new Ajv({
        //strict mode - true by default
        strict: false,
        //show all error through the schema
        allErrors: true,
        //show details stack trace
        verbose: true,
        formats:{
            double: "[+-]?\\d*\\.?\\d+",
            int32: /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
            int64: /^\d+$/,
        }
    })
    const validate = ajv.compile(schema)
    const valid = validate(body)
    if(!valid){
        throw new Error(`Schema validation error: ${JSON.stringify({
            validationErrors: validate.errors
        }, null, 2)}`)
    }
}