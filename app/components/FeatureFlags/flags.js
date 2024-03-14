export const USER_PORTAL_FLAGS = {
  USER_PORTAL_GUEST_AUTHENTICATION: "guest-authentication-feature-flag",
  USER_PORTAL_COMMUNICATION_PREFS: "communication-prefs-feature-flag",
  USER_PORTAL_USER_SUBMITTED_ACTIONS: "user-submitted-actions-feature-flag",
  USER_PORTAL_USER_SUBMITTED_EVENTS: "user-submitted-events-feature-flag",
  USER_PORTAL_USER_SUBMITTED_VENDORS: "user-submitted-vendors-feature-flag",
  USER_PORTAL_USER_SUBMITTED_TESTIMONIALS: "user-submitted-testimonials-feature-flag"
};

export const FLAGS = {
  NEW_USER_ENGAGEMENT_VIEW: "new-user-engagement-view-feature-flag",
  BROADCAST_MESSAGING_FF: "scheduled-broadcast-messages-feature-flag",
  ...USER_PORTAL_FLAGS
};
