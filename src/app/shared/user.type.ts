export interface User {
  url: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  organization: string;
}

export interface Organization {
    url: string;
    name: string;
    users: string[];
    repositories: string[];
}
