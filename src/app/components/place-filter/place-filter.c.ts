import * as ko from 'knockout';
import { PlaceFilterVM } from './place-filter.vm';
import { get } from '../../util/load';

import './place-filter.html';
import { KOUtil } from "../../util/koutil";

export function initPlaceFilter(): Promise<any> {
  return KOUtil.registerComponent('place-filter', PlaceFilterVM, '/place-filter.html');
}

