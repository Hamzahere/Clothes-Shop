import { createFeatureSelector } from "@ngrx/store";
import {Pages} from './pages';


export const selectPages = createFeatureSelector<Pages[]>('mypages');
