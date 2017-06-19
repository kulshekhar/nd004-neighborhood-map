import * as ko from 'knockout';
import { HelloVM } from './hello.vm';
import { get } from '../../util/load';

import './hello.html';
import { KOUtil } from "../../util/koutil";

let initialized = false;
let template = ''

export function initHello(): Promise<any> {
  return KOUtil.registerComponent('my-hello', HelloVM, '/hello.html');
}

