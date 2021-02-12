import {strict as assert} from 'assert';
import { PetController } from './api/controller/pet.controller';

const pet = new PetController();

describe('Pet', () => {
    it('receive pet by his id',async () => {
        const body = await pet.getById(1);
        assert(body.id == 1,`Expected API return pet with 1`)
    });

    it('can be received by status', async () => {
        
        let body = await pet.findByStatus('available')
        assert(body.length > 0);

        body = await pet.findByStatus('pending')
        assert(body.length > 0);

        body = await pet.findByStatus('sold')
        assert(body.length > 0);

        body =  await pet.findByStatus(['pending','available'])
        assert(body.length > 0);
        assert(body.some( (pet: any) => pet.status === 'available'))
        assert(body.some( (pet: any) => pet.status === 'pending'))
        assert(!body.some( (pet: any) => pet.status === 'sold'))
    })

    it('can be received by tag',async () => {
        const body = await pet.findByTags('tag1');
        assert(body.length > 0);
        assert(body.every(
            (pet:any) => pet.tags.some(
                (tag: any) => tag.name === 'tag1')
                )
            )
    })
})