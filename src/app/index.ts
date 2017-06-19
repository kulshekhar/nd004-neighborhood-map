import * as ko from 'knockout';

import '../style/style.scss';
import '../index.html';

import { get } from './util/load';
import { init as initHello } from './components/hello/hello.c';
import { show } from "./util/snackbar";
import { initializeMap, GMap } from "./map";

window['initMap'] = GMap;
