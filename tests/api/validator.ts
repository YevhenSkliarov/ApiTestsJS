import Ajv from 'ajv'

export function validate(schema: any, body: any){
    const ajv = new Ajv({
        //strict mode - true by default
        strict: false,
        //show all error through the schema
        allErrors: true,
        //show details stack trace
        verbose: true,
    })
    const validate = ajv.compile(schema)
    const valid = validate(body)
    if(!valid){
        throw new Error(`Schema validation error: ${JSON.stringify({
            validationErrors: validate.errors
        }, null, 2)}`)
    }
}