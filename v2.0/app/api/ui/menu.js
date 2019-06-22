module.exports = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'ios-stats',
    link: '/app/dashboard'
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
        link: '/app/add/community'
      },
      {
        key: 'all-communities',
        name: 'All Communities',
        link: '/app/read/communities'
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
        link: '/app/add/vendor'
      },
      {
        key: 'all-vendors',
        name: 'All Vendors',
        link: '/app/read/vendors'
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
        key: 'add-actions',
        name: 'Add New Action',
        link: '/app/add/action'
      },
      {
        key: 'all-actions',
        name: 'All Actions',
        link: '/app/read/actions'
      },
    ]
  },
  {
    key: 'events',
    name: 'Events',
    icon: 'md-wifi',
    child: [
      {
        key: 'about-events',
        name: 'Events',
        title: true
      },
      {
        key: 'add-event',
        name: 'Add Event',
        link: '/app/add/event'
      },
      {
        key: 'all-events',
        name: 'All Events',
        link: '/app/read/events'
      },
    ]
  },
  {
    key: 'categories',
    name: 'Categories',
    icon: 'md-reorder',
    child: [
      {
        key: 'about-categories',
        name: 'Categories',
        title: true
      },
      {
        key: 'add-vendor',
        name: 'Add New Category',
        link: '/app/add/category'
      },
      {
        key: 'all-categories',
        name: 'All Categories',
        link: '/app/read/categories'
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
        link: '/app/add/team'
      },
      {
        key: 'all-teams',
        name: 'All Teams',
        link: '/app/read/teams'
      },
    ]
  },
  {
    key: 'goals',
    name: 'Goals',
    icon: 'ios-checkmark-circle',
    child: [
      {
        key: 'about-goals',
        name: 'Goals',
        title: true
      },
      {
        key: 'add-goal',
        name: 'Add New Goal',
        link: '/app/add/goal'
      },
      {
        key: 'all-goals',
        name: 'All Goals',
        link: '/app/read/goals'
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
        link: '/app/add/testimonial'
      },
      {
        key: 'all-testimonials',
        name: 'All Testimonials',
        link: '/app/read/testimonials'
      },
    ]
  },
  {
    key: 'export',
    name: 'Export',
    icon: 'ios-cloud-download',
    link: '/export'
  },
  {
    key: 'policies',
    name: 'Policies',
    icon: 'ios-alert',
    link: '/policies'
  },
  {
    key: 'page-customization',
    name: 'Customize Pages',
    icon: 'ios-apps',
    child: [
      {
        key: 'about-pages',
        name: 'Website Pages',
        title: true
      },
      {
        key: 'home',
        name: 'Home',
        link: '/app/add/home'
      },
      {
        key: 'all-actions',
        name: 'All Actions',
        link: '/app/read/all-actions'
      },
      {
        key: 'donate',
        name: 'Donate',
        link: '/app/read/donate'
      },
      {
        key: 'contact',
        name: 'Contact Us',
        link: '/app/read/contact-us'
      },
      {
        key: 'about-us',
        name: 'About Us',
        link: '/app/read/about-us'
      },
    ]
  },
  {
    key: 'demo',
    name: 'Demo',
    title: true,
  },
  {
    key: 'pages',
    name: 'Pages',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'other_page',
        name: 'Welcome Page',
        title: true,
      },
      {
        key: 'blank',
        name: 'Blank Page',
        link: '/app'
      },
      {
        key: 'main_page',
        name: 'Sample Page',
        title: true,
      },
      {
        key: 'dashboard',
        name: 'Dashboard',
        link: '/app/dashboard'
      },
      {
        key: 'form',
        name: 'Form',
        link: '/app/form'
      },
      {
        key: 'table',
        name: 'Table',
        link: '/app/table'
      },
      {
        key: 'maintenance',
        name: 'Maintenance',
        link: '/maintenance'
      },
      {
        key: 'coming_soon',
        name: 'Coming Soon',
        link: '/coming-soon'
      },
    ]
  },
  {
    key: 'auth',
    name: 'Auth Page',
    icon: 'ios-contact-outline',
    child: [
      {
        key: 'login',
        name: 'Login',
        link: '/login'
      },
      {
        key: 'register',
        name: 'Register',
        link: '/register'
      },
      {
        key: 'reset',
        name: 'Reset Password',
        link: '/reset-password'
      },
    ]
  },
  {
    key: 'errors',
    name: 'Errors',
    icon: 'ios-paw-outline',
    child: [
      {
        key: 'not_found_page',
        name: 'Not Found Page',
        link: '/app/pages/not-found'
      },
      {
        key: 'error_page',
        name: 'Error Page',
        link: '/app/pages/error'
      },
    ]
  },
  {
    key: 'menu_levels',
    name: 'Menu Levels',
    multilevel: true,
    icon: 'ios-menu-outline',
    child: [
      {
        key: 'level_1',
        name: 'Level 1',
        link: '/#'
      },
      {
        key: 'level_2',
        keyParent: 'menu_levels',
        name: 'Level 2',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Sub Menu 1',
            link: '/#'
          },
          {
            key: 'sub_menu_2',
            name: 'Sub Menu 2',
            link: '/#'
          },
        ]
      },
    ]
  }
];
