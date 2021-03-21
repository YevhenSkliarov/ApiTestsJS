import { BaseController } from './base.controller';
import { JsonRequestWithValidation } from '../request';
import { operations } from '../../.temp/types';

export class UserController extends BaseController {
  async login(credentials: { username: string; password: string }): Promise<string> {
    return (await new JsonRequestWithValidation()
      .url('http://localhost/v2/user/login')
      .headers({token: this.params.token})
      .searchParams(credentials)
      .send<operations['loginUser']['responses']['200']['schema']>()).headers['token'] as string;
  }
}
