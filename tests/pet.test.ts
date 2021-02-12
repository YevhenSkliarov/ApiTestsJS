import {strict as assert} from 'assert';
import { PetController } from './api/controller/pet.controller';

const pet = new PetController();

describe('Pet', () => {
    it('can be received pet by his id',async () => {
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

    it('can be added, updated and deleted', async() => {
        const petToCreate = {
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "Cat",
            "photoUrls": [
                "http://test.com/image.jpg"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }
        const addedPet = await pet.addNew(petToCreate);
        assert.deepEqual(addedPet, {
            ...petToCreate,
            id: addedPet.id
        }, `Expected created pat to mathc data used upon creation`);

        const foundAddedPet = await pet.getById(addedPet.id);
        assert.deepEqual(foundAddedPet, {
            ...petToCreate,
            id: addedPet.id
        }, `Expected found pet to math created pet`);

        const newerPet = {
            "id": addedPet.id,
            "category": {
                "id": 1,
                "name": "string2"
            },
            "name": "Dog",
            "photoUrls": [
                "http://test.com/image2.jpg"
            ],
            "tags": [
                {
                    "id": 1,
                    "name": "string2"
                }
            ],
            "status": "pending"
        }
        const updatedPet = await pet.update(newerPet);
        assert.deepEqual(updatedPet, newerPet, `Expected updated pet to equal data used upon updating`);

        await pet.delete(addedPet.id)
        //TODO: assert 404 error
    });
})