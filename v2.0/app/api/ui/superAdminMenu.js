module.exports = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'ios-stats',
    link: '/'
  },
  {
    key: 'communities',
    name: 'Communities',
    icon: 'ios-people',
    child: [
      {
        key: 'about-communities',
        name: 'Communities',
        title: true,
      },
      {
        key: 'onboard-community',
        name: 'Add New Community',
        link: '/admin/add/community'
      },
      {
        key: 'all-communities',
        name: 'All Communities',
        link: '/admin/read/communities'
      },
    ]
  },
  {
    key: 'actions',
    name: 'Actions',
    icon: 'ios-bulb',
    child: [
      {
        key: 'about-actions',
        name: 'Actions',
        title: true
      },
      {
        key: 'add-action',
        name: 'Add New Action',
        link: '/admin/add/action'
      },
      {
        key: 'all-actions',
        name: 'All Actions',
        link: '/admin/read/actions'
      },
    ]
  },
  {
    key: 'events',
    name: 'Events & Campaigns',
    icon: 'md-wifi',
    child: [
      {
        key: 'about-events',
        name: 'Events & Campaigns',
        title: true
      },
      {
        key: 'add-event',
        name: 'Add Event or Campaign',
        link: '/admin/add/event'
      },
      {
        key: 'all-events',
        name: 'All Events & Campaigns',
        link: '/admin/read/events'
      },
    ]
  },
  {
    key: 'messages',
    name: 'Messages',
    icon: 'md-reorder',
    child: [
      {
        key: 'all-messages',
        name: 'All Messages',
        title: true
      },
      {
        key: 'all-team-admin-messages',
        name: 'Team Admin Messages',
        link: '/admin/read/team_admin_messages'
      },
      {
        key: 'all-community-admin-messages',
        name: 'Community Admin Messages',
        link: '/admin/read/community_admin_messages'
      },
    ]
  },
  {
    key: 'teams',
    name: 'Teams',
    icon: 'ios-people',
    child: [
      {
        key: 'about-teams',
        name: 'Teams',
        title: true
      },
      {
        key: 'add-team',
        name: 'Add New Team',
        link: '/admin/add/team'
      },
      {
        key: 'all-teams',
        name: 'All Teams',
        link: '/admin/read/teams'
      },
    ]
  },
  {
    key: 'subscribers',
    name: 'Subscribers',
    icon: 'md-reorder',
    child: [
      {
        key: 'about-subscribers',
        name: 'Subscribers',
        title: true
      },
      // {
      //   key: 'add-subscriber',
      //   name: 'Add Subscriber',
      //   link: '/admin/add/subscriber'
      // },
      {
        key: 'all-subscribers',
        name: 'All Subscribers',
        link: '/admin/read/subscribers'
      },
    ]
  },
  {
    key: 'testimonials',
    name: 'Testimonials',
    icon: 'ios-analytics',
    child: [
      {
        key: 'about-testimonials',
        name: 'testimonials',
        title: true
      },
      {
        key: 'add-testimonial',
        name: 'Add New Testimonial',
        link: '/admin/add/testimonial'
      },
      {
        key: 'all-testimonials',
        name: 'All Testimonials',
        link: '/admin/read/testimonials'
      },
    ]
  },
  {
    key: 'vendors',
    name: 'Vendors',
    icon: 'md-hammer',
    child: [
      {
        key: 'about-vendors',
        name: 'Contractors/Vendors',
        title: true
      },
      {
        key: 'add-vendor',
        name: 'Add New Vendor',
        link: '/admin/add/vendor'
      },
      {
        key: 'all-vendors',
        name: 'All Vendors',
        link: '/admin/read/vendors'
      },
    ]
  },
  {
    key: 'policies',
    name: 'Policies',
    icon: 'ios-alert',
    child: [
      {
        key: 'about-policies',
        name: 'policies',
        title: true
      },
      {
        key: 'add-policy',
        name: 'Add New Policy',
        link: '/admin/add/policy'
      },
      {
        key: 'all-policies',
        name: 'All Policies',
        link: '/admin/read/policies'
      },
    ]
  },
  {
    key: 'users',
    name: 'Users',
    icon: 'ios-people',
    link: '/admin/read/users'
  },
  {
    key: 'add-new-super-admin',
    name: 'New Super admin',
    icon: 'ios-add-circle',
    link: '/admin/add-super-admin'
  },
  {
    key: 'tags-collections',
    name: 'Tag Collections',
    icon: 'md-reorder',
    child: [
      {
        key: 'about-categories',
        name: 'Tags & Tag Collections',
        title: true
      },
      {
        key: 'add-category',
        name: 'Add New Category',
        link: '/admin/add/category'
      },
      {
        key: 'all-collections',
        name: 'All Tag Collections',
        link: '/admin/read/tag-collections'
      },
    ]
  },
];
