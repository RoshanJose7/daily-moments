/// <reference types="react-scripts" />

interface RouteParams {
  id: string;
}

interface entryType {
  id: string;
  date: string;
  title: string;
  description: string;
  imgUrl: string;
}

interface Auth {
  loggedIn: boolean;
  uid?: string;
}

interface AuthInit {
  loading: boolean;
  auth?: Auth;
}
