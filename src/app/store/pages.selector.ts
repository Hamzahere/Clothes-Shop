import { createFeatureSelector } from "@ngrx/store";
import {State} from './pages';


export const selectPages = createFeatureSelector<State[]>('mypages');
