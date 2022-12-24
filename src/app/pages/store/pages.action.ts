import { createAction,props } from "@ngrx/store";
import { Pages } from "./pages";


export const invokePagesAPI = createAction(
    '[Pages API] Invoke Pages Fetch API'
)

export const pagesFetchAPISuccess = createAction(
    '[Pages API] Fetch API Success',
    props<{ allPages: Pages[] }>()
  );