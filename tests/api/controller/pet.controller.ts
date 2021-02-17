import { URLSearchParams } from "url";
//import { JsonRequest } from 'http-req-builder'
import { JsonRequest } from '../request'
import {definitions, operations } from '../../../.temp/types'

export class PetController {
    async getById(id: number | string) {
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/pet/${id}`)
            .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
    }

    async findByTags(tags: string | string[] ) {
        return (
            await new JsonRequest()
            .url('http://localhost/v2/pet/findByTags')
            .searchParams(new URLSearchParams({tags}))
            .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body
    }

    async findByStatus(status: string | string[] ) {
        return (
            await new JsonRequest()
            .url('http://localhost/v2/pet/findByStatus')
            .searchParams(new URLSearchParams({status}))
            .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>){
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/pet`)
            .method('POST')
            .body(pet)
            .send<operations['addPet']['responses']['200']['schema']>()
        ).body
      }

      async delete(id: number | string) {
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/pet/${id}`)
            .method('DELETE')
            .send<definitions['ApiResponse']>()
        ).body

      }

      async update(pet: definitions['Pet']){
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/pet`)
            .method('PUT')
            .body(pet)
            .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
      }
}