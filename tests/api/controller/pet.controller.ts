import got from "got/dist/source";
import { URLSearchParams } from "url";

export class PetController {
    async getById(id: number | string) {
        const response = await got(`http://localhost/v2/pet/${id}`)
        return JSON.parse(response.body)
    }

    async findByTags(tags: string | string[] ) {
        const response = await got('http://localhost/v2/pet/findByTags',{
            searchParams: new URLSearchParams({
                tags
            })
        })
        return JSON.parse(response.body)
    }

    async findByStatus(status: string | string[] ) {
        const response = await got('http://localhost/v2/pet/findByStatus',{
            searchParams: new URLSearchParams({
                status
            })
        })
        return JSON.parse(response.body)
    }
}