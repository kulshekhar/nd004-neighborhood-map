import * as ko from 'knockout';
import { HelloVM } from './hello.vm';
import { get } from '../../util/load';

import './hello.html';

let initialized = false;
let template = ''

export function init() {
  if (!initialized) {
    get('/hello.html')
      .then(t => {
        template = t;
        if (!initialized) {
          ko.components.register('my-hello', {
            viewModel: HelloVM,
            template: template
          });
          ko.applyBindings(new HelloVM({}));
          initialized = true;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

