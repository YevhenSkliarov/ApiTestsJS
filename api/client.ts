import { PetController } from './controller/pet.controller';
import { StoreController } from './controller/store.controller';
import { CookieJar } from 'tough-cookie';
import { UserController } from './controller/user.controller';

export class ApiClient {
  public readonly pet: PetController;
  public readonly store: StoreController;
  public readonly user: UserController;

  constructor(params?: { token?: string; cookies?: CookieJar }) {
    const defaultParams = {
      cookies: new CookieJar()
    };
    const mergedParams = {
      ...defaultParams,
      ...params
    };

    this.pet = new PetController(mergedParams);
    this.store = new StoreController(mergedParams);
    this.user = new UserController(mergedParams);
  }

  static unauthorized() {
    return new ApiClient();
  }

  static async loginAs(credentials: { username: string; password: string }) {
    return new ApiClient({
      token: await ApiClient.unauthorized().user.login(credentials)
    });
  }
}
