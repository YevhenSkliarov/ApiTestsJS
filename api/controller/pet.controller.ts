import { URLSearchParams } from 'url';
import { JsonRequestWithValidation } from '../request';
//import { JsonRequest } from 'http-req-builder'
//import { JsonRequest } from '../request';
import { definitions, operations } from '../../.temp/types';
import { loadAPIspec, validate } from '../validator';
import { BaseController } from './base.controller';

export class PetController extends BaseController {
  async getById(id: number | string) {
    const body = (await new JsonRequestWithValidation()
      .url(`http://localhost/v2/pet/${id}`)
      .headers({ token: this.params.token })
      .send<operations['getPetById']['responses']['200']['schema']>()).body;
    //  const apiSpec = await loadAPIspec();
    //  const schema = apiSpec.paths['/pet/{petId}']['get']['responses']['200']['schema']
    //   validate(schema, body)
    return body;
  }

  async findByTags(tags: string | string[]) {
    return (await new JsonRequestWithValidation()
      .url('http://localhost/v2/pet/findByTags')
      .headers({ token: this.params.token })
      .searchParams(new URLSearchParams({ tags }))
      .send<operations['findPetsByTags']['responses']['200']['schema']>()).body;
  }

  async findByStatus(status: string | string[]) {
    return (await new JsonRequestWithValidation()
      .url('http://localhost/v2/pet/findByStatus')
      .headers({ token: this.params.token })
      .searchParams(new URLSearchParams({ status }))
      .send<operations['findPetsByStatus']['responses']['200']['schema']>()).body;
  }

  async addNew(pet: Omit<definitions['Pet'], 'id'>) {
    return (await new JsonRequestWithValidation()
      .url(`http://localhost/v2/pet`)
      .headers({ token: this.params.token })
      .method('POST')
      .body(pet)
      .send<operations['addPet']['responses']['200']['schema']>()).body;
  }

  async delete(id: number | string) {
    return (await new JsonRequestWithValidation()
      .url(`http://localhost/v2/pet/${id}`)
      .headers({ token: this.params.token })
      .method('DELETE')
      .send<definitions['AbstractApiResponse']>()).body;
  }

  async update(pet: definitions['Pet']) {
    return (await new JsonRequestWithValidation()
      .url(`http://localhost/v2/pet`)
      .headers({ token: this.params.token })
      .method('PUT')
      .body(pet)
      .send<operations['updatePet']['responses']['200']['schema']>()).body;
  }
}
