export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Library',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Local',
      url: '/library',
      icon: 'fa fa-book',
    },
    {
      name: 'Whoville',
      url: '/whoville',
      icon: 'fa fa-building-o',
    },
    {
      name: 'Create Bundle',
      url: '/generator',
      icon: 'icon-magic-wand',
    },
    {
      title: true,
      name: 'Advanced',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Custom Add-Ons',
      icon: 'icon-pencil',
      children: [
        {
          name: 'Recipes',
          url: '/recipes',
          icon: 'icon-wrench',
        },
        // {
        //   name: 'NiFi Templates',
        //   url: '/nifitemplates',
        //   icon: 'icon-note',
        // },
        // {
        //   name: 'Zeppelin Notes',
        //   url: '/zeppelinnotes',
        //   icon: 'icon-notebook',
        // },
        // {
        //   name: 'SQL Scripts',
        //   url: '/sqlscripts',
        //   icon: 'icon-puzzle',
        // },
      ],
    },
    {
      name: 'Manage',
      icon: 'icon-settings',
      children: [
        
        {
          name: 'Profiles',
          url: '/profiles',
          icon: 'fa fa-cloud',
        },
        {
          name: 'Users',
          url: '/users',
          icon: 'icon-people',
        }
      ],
    },
    
  ],
};
