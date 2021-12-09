/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from "redux-form/immutable";
import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";
import history from "utils/history";

import languageProviderReducer from "containers/LanguageProvider/reducer";
import login from "./modules/login";
import uiReducer from "./modules/ui";
import contact from "./modules/contact";
import initval from "./modules/initForm";
import app, {
  communitiesReducer,
  summaryDataReducer,
  graphDataReducer,
  tokenReducer,
  selectedCommunityReducer,
  fullSelectedCommunityReducer,
  authAdminReducer,
  allActionsReducer,
  allEventsReducer,
  allTestimonialsReducer,
  allUsersReducer,
  allTagsReducer,
  allTeamsReducer,
  allGoalsReducer,
  vendorsReducer,
  policiesReducer,
  galleryImagesReducer,
} from "./modules/appReducer";

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    galleryImages: galleryImagesReducer,
    app,
    form,
    login,
    contact,
    ui: uiReducer,
    auth: authAdminReducer,
    communities: communitiesReducer,
    summary_data: summaryDataReducer,
    graph_data: graphDataReducer,
    allActions: allActionsReducer,
    allTestimonials: allTestimonialsReducer,
    allTags: allTagsReducer,
    allUsers: allUsersReducer,
    allEvents: allEventsReducer,
    allTeams: allTeamsReducer,
    allGoals: allGoalsReducer,
    allVendors: vendorsReducer,
    allPolicies: policiesReducer,
    token: tokenReducer,
    selected_community: selectedCommunityReducer,
    full_selected_community: fullSelectedCommunityReducer,
    initval,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
