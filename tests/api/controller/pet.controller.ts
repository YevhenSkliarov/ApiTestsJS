import { URLSearchParams } from "url";
//import { JsonRequest } from 'http-req-builder'
import { JsonRequest } from '../request'
import {definitions, operations } from '../../../.temp/types'
import { validate } from "../validator";

export class PetController {
    async getById(id: number | string) {
        const body = (
            await new JsonRequest()
            .url(`http://localhost/v2/pet/${id}`)
            .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
        const schema = {
            "$schema": "http://json-schema.org/draft-07/schema",
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "category": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "name": {
                            "type": "string"
                        }
                    }
                },
                "name": {
                    "type": "string"
                },
                "photoUrls": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "name": {
                                "type": "string"
                            }
                        }
                    }
                },
                "status": {
                    "type": "string"
                }
            }
        }
        validate(schema, body)
        return body
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
            .send<definitions['AbstractApiResponse']>()
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