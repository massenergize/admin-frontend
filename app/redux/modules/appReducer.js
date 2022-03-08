import { Map, fromJS } from "immutable";
import { START_UP } from "../../actions/actionConstants";
import {
  LOAD_ALL_COMMUNITIES,
  LOAD_AUTH_ADMIN,
  LOAD_ID_TOKEN,
  SELECTED_COMMUNITY,
  SELECTED_COMMUNITY_FULL,
  GET_ALL_ACTIONS,
  GET_ALL_TESTIMONIALS,
  GET_ALL_EVENTS,
  GET_ALL_USERS,
  GET_ALL_TAG_COLLECTIONS,
  GET_ALL_TEAMS,
  GET_ALL_GOALS,
  GET_ALL_VENDORS,
  GET_ALL_POLICIES,
  LOAD_SUMMARY_DATA,
  LOAD_GRAPH_DATA,
  LOAD_GALLERY_IMAGES,
  LOAD_SEARCHED_IMAGES,
  KEEP_LOADED_IMAGE_INFO,
  LOAD_MODAL_LIBRARY,
  GET_ADMIN_MESSAGES,
  GET_TEAM_MESSAGES,
  GET_ALL_SUBSCRIBERS,
  UPDATE_HEAP,
  LOAD_CC_ACTIONS,
} from "../ReduxConstants";

const initialState = Map({
  constants: {},
  profile: null,
});

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case START_UP:
      return state;
    default:
      return state;
  }
}

export const reducerForCCAction = (state = [], action = {}) => {
  switch (action.type) {
    case LOAD_CC_ACTIONS:
      return action.payload;

    default:
      return state;
  }
};
export const reducerForHeap = (state = {}, action = {}) => {
  switch (action.type) {
    case UPDATE_HEAP:
      return action.payload;

    default:
      return state;
  }
};
export const subscribersReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_SUBSCRIBERS:
      return action.payload;

    default:
      return state;
  }
};
export const teamMessagesReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_TEAM_MESSAGES:
      return action.payload;

    default:
      return state;
  }
};
export const adminMessagesReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ADMIN_MESSAGES:
      return action.payload;

    default:
      return state;
  }
};
export const modalLibraryReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_MODAL_LIBRARY:
      return action.payload;

    default:
      return state;
  }
};
export const imageInfosReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case KEEP_LOADED_IMAGE_INFO:
      return action.payload;

    default:
      return state;
  }
};
export const searchedImagesReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_SEARCHED_IMAGES:
      return action.payload;

    default:
      return state;
  }
};
export const galleryImagesReducer = (state = [], action = {}) => {
  switch (action.type) {
    case LOAD_GALLERY_IMAGES:
      return action.payload;

    default:
      return state;
  }
};
export const communitiesReducer = (state = [], action = {}) => {
  switch (action.type) {
    case LOAD_ALL_COMMUNITIES:
      return action.payload;

    default:
      return state;
  }
};

export const summaryDataReducer = (state = [], action = {}) => {
  switch (action.type) {
    case LOAD_SUMMARY_DATA:
      return action.payload;

    default:
      return state;
  }
};

export const graphDataReducer = (state = [], action = {}) => {
  switch (action.type) {
    case LOAD_GRAPH_DATA:
      return action.payload;

    default:
      return state;
  }
};
export const policiesReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_POLICIES:
      return action.payload;
    default:
      return state;
  }
};
export const vendorsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_VENDORS:
      return action.payload;
    default:
      return state;
  }
};
let localUser = localStorage.getItem("authUser");
localUser = localUser ? JSON.parse(localUser) : null;

export const authAdminReducer = (state = localUser, action = {}) => {
  switch (action.type) {
    case LOAD_AUTH_ADMIN:
      return action.payload;
    default:
      return state;
  }
};
export const tokenReducer = (state = null, action = {}) => {
  switch (action.type) {
    case LOAD_ID_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
export const allActionsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_ACTIONS:
      return action.payload;
    default:
      return state;
  }
};

export const allGoalsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_GOALS:
      return action.payload;
    default:
      return state;
  }
};
export const allTagsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_TAG_COLLECTIONS:
      return action.payload;
    default:
      return state;
  }
};
export const allTeamsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_TEAMS:
      return action.payload;

    default:
      return state;
  }
};
export const allEventsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.payload;
    default:
      return state;
  }
};
export const allUsersReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    default:
      return state;
  }
};
export const allTestimonialsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_TESTIMONIALS:
      return action.payload;
    default:
      return state;
  }
};
export const selectedCommunityReducer = (state = null, action = {}) => {
  switch (action.type) {
    case SELECTED_COMMUNITY:
      return action.payload;
    default:
      return state;
  }
};
export const fullSelectedCommunityReducer = (state = null, action = {}) => {
  switch (action.type) {
    case SELECTED_COMMUNITY_FULL:
      return action.payload;
    default:
      return state;
  }
};

export const allReducers = {
  communities: communitiesReducer,
};
