import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';

import ProfilePage from './ProfilePage';

export const profileRoutes = [
  {
    path: '/profile',
    breadcrumb: 'Profile',
    Component: ProfilePage,
  },
  {
    path: '/profile/:id',
    breadcrumb: (props: BreadcrumbComponentProps) => props.match.params.id,
    Component: ProfilePage,
  },
];

export const profileSidebarRoutes = [
  {
    path: '/profile',
    label: 'Profile',
    icon: faUser,
  },
];
