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
      title: true,
      name: 'Create',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Bundles',
      url: '/generator',
      icon: 'icon-magic-wand',
    },
    {
      name: 'Recipes',
      url: '/recipes',
      icon: 'icon-wrench',
    },
    {
      title: true,
      name: 'Configure',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Profile',
      url: '/profiles/1',
      icon: 'icon-settings',
    },
    
  ],
};
