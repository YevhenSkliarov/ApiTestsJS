import got from 'got';
import {strict as assert} from 'assert';

describe('Pet', () => {
    it('receive pet by his id',async () =>{
        const response = await got('http://93.126.97.71:10080/api/pet/1')
        const body = JSON.parse(response.body)
        assert(body.id == 1,`Expected API return pet with 1`)
    })
})