import {secondInMs} from '../../../utils/helpers/date-time/time-in-ms';
import { ISwipe } from './swipe.interface';

export const IN_FRAME_TIME = secondInMs;
export const MIN_HORIZONTAL_DISTANCE = 30;
export const MIN_HORIZONTAL_RATIO = 3;

export const SWIPE_INITIAL_DATA: ISwipe = { coord: [0, 0], time: 0 };
