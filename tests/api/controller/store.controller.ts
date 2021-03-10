import { operations } from "../../../.temp/types";
import { JsonRequestWithValidation } from "../request";


export class StoreController {
    async getInventory(){
        return (
            await new JsonRequestWithValidation()
                .url(`http://localhost/v2/store/inventory`)
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}