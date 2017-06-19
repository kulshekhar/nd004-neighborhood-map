import * as ko from 'knockout';
import { get } from "./load";

export class KOUtil {
  static registeredComponents = {};

  static registerComponent(
    selector: string,
    vm: any,
    templateUrl: string,
  ): Promise<any> {

    return new Promise(async (resolve, reject) => {

      if (!this.registeredComponents[selector]) {
        try {
          const t = await get(templateUrl)

          if (!this.registeredComponents[selector]) {

            ko.components.register(selector, {
              viewModel: vm,
              template: t
            });

            this.registeredComponents[selector] = true;
            resolve(true);

          } else {
            reject('Already initialized');
          }
        } catch (e) {
          reject(e);
        }
      } else {
        reject('Already initialized');
      }

    });

  }
}
