import {definitions, operations} from '../../.temp/types';
import { JsonRequestWithValidation } from '../request';
import {BaseController} from "./base.controller";

export class StoreController extends BaseController {
  async getInventory() {
    return (await new JsonRequestWithValidation()
      .url(`http://localhost/v2/store/inventory`)
      .headers({token: this.params.token})
      .send<operations['getInventory']['responses']['200']['schema']>()).body;
  }

  async placeOrder(order: Omit<definitions["Order"], 'id'>){
    return (await new JsonRequestWithValidation()
            .url(`http://localhost/v2/store/order`)
            .headers({token: this.params.token})
            .method("POST")
            .body(order)
            .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
    ).body
  }

  async getOrderById(id: number | string){
    return (await new JsonRequestWithValidation()
            .url(`http://localhost/v2/store/order/${id}`)
            .headers({token: this.params.token})
            .send<operations['getOrderById']['responses']['200']['schema']>()
    ).body
  }
}
