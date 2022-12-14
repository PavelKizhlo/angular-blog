export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  displayName: string;
  email: string;
  idToken: string;
  kind: string;
  localId: string;
  expiresIn: string;
  registered: boolean;
}

export interface FbCreateResponse {
  name: string;
}

export interface Post {
  id?: string;
  title: string;
  author: string;
  text: string;
  date: Date;
}
