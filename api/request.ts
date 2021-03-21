/*import type { Options, Method, Response } from 'got'
import got from 'got'*/
import { JsonRequest } from 'http-req-builder';
import { ResponseValidator } from 'response-openapi-validator';

const responseValidator = new ResponseValidator({
  openApiSpecPath: 'http://localhost/v2/swagger.json',
  apiPathPrefix: '/v2',
  ajvOptions: {
    //strict mode - true by default
    //strict: false,
    //show all error through the schema
    allErrors: true,
    //show details stack trace
    verbose: true,
    formats: {
      double: '[+-]?\\d*\\.?\\d+',
      int32: /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
      int64: /^\d+$/
    }
  }
});

/*export class JsonRequest {
    protected options: any = {
        responseType: 'json',
        headers:{
            Authorization:'Bearer 1'
        }
    };

    public url(url: string | URL): this {
        this.options.url = url;
        return this
    }

    public method(method: Method): this {
        this.options.method = method;
        return this
    }

    public searchParams(searchParams: Options['searchParams']): this{
        this.options.searchParams = searchParams;
        return this
    }

    public body(body: any): this{
        this.options.json = body;
        return this
    }

    public send<T>(): Promise<Response<T>>{
        return got<T>(this.options)
    }
}*/

export class JsonRequestWithValidation extends JsonRequest {
  async send<T>() {
    const response = await super.send<T>();
    await responseValidator.assertResponse({
      method: response.request.options.method,
      requestUrl: response.request.requestUrl,
      statusCode: response.statusCode,
      body: response.body
    });
    return response;
  }
}