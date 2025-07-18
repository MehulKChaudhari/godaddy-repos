export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
  visibility: string;
  default_branch: string;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
  owner: {
    login: string;
    avatar_url: string;
    type: string;
  };
}

export interface ApiResponse {
  data: Repository[];
  loading: boolean;
  error: string | null;
} 