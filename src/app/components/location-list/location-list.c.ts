import * as ko from 'knockout';
import { LocationListVM } from './location-list.vm';
import { get } from '../../util/load';

import './location-list.html';
import { KOUtil } from "../../util/koutil";

export function initLocationList(): Promise<any> {
  return KOUtil.registerComponent('location-list', LocationListVM, '/location-list.html');
}

