export class Repository {
  // url is how to identify the project in the API, as opposed to where the code lives
  id: string;
  url: string;
  name: string;
  organization: string;
  description: string;
  token: string;
  log: string;
  language: string;
  // address is the place to get the actual code
  address: string;
  allowed_emails: string[];
  measurements: string;
  topics: string;
  repositoryOwner: string;
  createdAt: string;
}
