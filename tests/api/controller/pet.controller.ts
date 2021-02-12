import { URLSearchParams } from "url";
import { JsonRequest } from '../request'

export class PetController {
    async getById(id: number | string) {
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/pet/${id}`)
            .send()
        ).body;
    }

    async findByTags(tags: string | string[] ) {
        return (
            await new JsonRequest()
            .url('http://localhost/v2/pet/findByTags')
            .searchParams(new URLSearchParams({tags}))
            .send()
        ).body
    }

    async findByStatus(status: string | string[] ) {
        return (
            await new JsonRequest()
            .url('http://localhost/v2/pet/findByStatus')
            .searchParams(new URLSearchParams({status}))
            .send()
        ).body
    }

    async addNew(pet: {
        category: {
          id: number,
          name: string
        },
        name: string,
        photoUrls: string[],
        tags: 
          {
            id: number,
            name: string
          }[],
        status: string
      }){
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/pet`)
            .method('POST')
            .body(pet)
            .send()
        ).body
      }

      async delete(id: number | string) {
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/pet/${id}`)
            .method('DELETE')
            .send()
        ).body

      }

      async update(pet: {
        id: number,
        category: {
          id: number,
          name: string
        },
        name: string,
        photoUrls: string[],
        tags: 
          {
            id: number,
            name: string
          }[],
        status: string
      }){
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/pet`)
            .method('PUT')
            .body(pet)
            .send()
        ).body
      }
}