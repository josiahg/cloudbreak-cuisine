import React from 'react';
import DefaultLayout from './containers/DefaultLayout';


const Library = React.lazy(() => import('./views/Library/Library'));
const LibraryItem = React.lazy(() => import('./views/Library/LibraryItem'));
const Generator = React.lazy(() => import('./views/Generator/Generator'));

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Profiles = React.lazy(() => import('./views/Profiles/Profiles'));
const Profile = React.lazy(() => import('./views/Profiles/Profile'));
const EditProfile = React.lazy(() => import('./views/Profiles/EditProfile'));
const AddProfile = React.lazy(() => import('./views/Profiles/AddProfile'));
const Recipes = React.lazy(() => import('./views/Recipes/Recipes'));
const AddRecipe = React.lazy(() => import('./views/Recipes/AddRecipe'));
const NifiTemplates = React.lazy(() => import('./views/NifiTemplates/NifiTemplates'));
const AddNifiTemplate = React.lazy(() => import('./views/NifiTemplates/AddNifiTemplate'));
const ZeppelinNotes = React.lazy(() => import('./views/ZeppelinNotes/ZeppelinNotes'));
const AddZeppelinNote = React.lazy(() => import('./views/ZeppelinNotes/AddZeppelinNote'));
const SQLScripts = React.lazy(() => import('./views/SQLScripts/SQLScripts'));
const AddSQLScript = React.lazy(() => import('./views/SQLScripts/AddSQLScript'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/generator', name: 'Generator', component: Generator },
  { path: '/recipes', exact: true,  name: 'Recipes', component: Recipes },
  { path: '/addrecipe', exact: true,  name: 'Add Recipe', component: AddRecipe },
  { path: '/nifitemplates', exact: true,  name: 'Nifi Templates', component: NifiTemplates },
  { path: '/addnifitemplate', exact: true,  name: 'Add Nifi Template', component: AddNifiTemplate },
  { path: '/zeppelinnotes', exact: true,  name: 'Zeppelin Notes', component: ZeppelinNotes },
  { path: '/addzeppelinnote', exact: true,  name: 'Add Zeppelin Note', component: AddZeppelinNote },
  { path: '/sqlscripts', exact: true,  name: 'SQL Scripts', component: SQLScripts },
  { path: '/addsqlscript', exact: true,  name: 'Add SQL Script', component: AddSQLScript },
   { path: '/users', exact: true,  name: 'Users', component: Users },
   { path: '/users/:id', exact: true, name: 'User Details', component: User },
   { path: '/profiles', exact: true,  name: 'Profiles', component: Profiles },
   { path: '/profiles/:id', exact: true, name: 'Profile', component: Profile },
   { path: '/editprofiles/:id', exact: true, name: 'EditProfile', component: EditProfile },
   { path: '/addprofile', exact: true, name: 'AddProfile', component: AddProfile },

  { path: '/library', exact: true, name: 'Library', component: Library },
  { path: '/library/:id', exact: true, name: 'Bundle Details', component: LibraryItem },
];

export default routes;
