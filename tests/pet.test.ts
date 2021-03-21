import { strict as assert } from 'assert';
import { definitions } from '../.temp/types';
import { ApiClient } from '../api/client';

describe('Pet', () => {
  it('can be received pet by his id', async () => {
    const body = await ApiClient.unauthorized().pet.getById(1);
    assert(body.id == 1, `Expected API return pet with 1`);
  });

  it('can be received by status', async () => {
    let body = await ApiClient.unauthorized().pet.findByStatus('available');
    assert(body.length > 0);

    body = await ApiClient.unauthorized().pet.findByStatus('pending');
    assert(body.length > 0);

    body = await ApiClient.unauthorized().pet.findByStatus('sold');
    assert(body.length > 0);

    body = await ApiClient.unauthorized().pet.findByStatus(['pending', 'available']);
    assert(body.length > 0);
    assert(body.some(pet => pet.status === 'available'));
    assert(body.some(pet => pet.status === 'pending'));
    assert(!body.some(pet => pet.status === 'sold'));
  });

  it('can be received by tag', async () => {
    const body = await ApiClient.unauthorized().pet.findByTags('tag1');
    assert(body.length > 0);
    assert(body.every(pet => pet.tags!.some(tag => tag.name === 'tag1')));
  });

  it('can be added, updated and deleted', async () => {
    const adminClient = await ApiClient.loginAs({
      username: 'admin',
      password: 'admin'
    });
    //Omit - create new type without selected key
    const petToCreate: Omit<definitions['Pet'], 'id'> = {
      category: {
        id: 0,
        name: 'string'
      },
      name: 'Cat',
      photoUrls: ['http://test.com/image.jpg'],
      tags: [
        {
          id: 0,
          name: 'string'
        }
      ],
      status: 'available'
    };
    const addedPet = await adminClient.pet.addNew(petToCreate);
    assert.deepEqual(
      addedPet,
      {
        ...petToCreate,
        id: addedPet.id
      },
      `Expected created pat to mathc data used upon creation`
    );
    const foundAddedPet = await adminClient.pet.getById(addedPet.id!);
    assert.deepEqual(
      foundAddedPet,
      {
        ...petToCreate,
        id: addedPet.id
      },
      `Expected found pet to math created pet`
    );

    const newerPet: definitions['Pet'] = {
      id: addedPet.id,
      category: {
        id: 1,
        name: 'string2'
      },
      name: 'Dog',
      photoUrls: ['http://test.com/image2.jpg'],
      tags: [
        {
          id: 1,
          name: 'string2'
        }
      ],
      status: 'pending'
    };
    const updatedPet = await adminClient.pet.update(newerPet);
    assert.deepEqual(updatedPet, newerPet, `Expected updated pet to equal data used upon updating`);

    await adminClient.pet.delete(addedPet.id!);
    //TODO: assert 404 error
  });
});
