# Github Repositories Explorer

```html
<img src="https://raw.githubusercontent.com/your-username/your-repo-name/main/public/Test.jpg" alt="App Screenshot" width="240" height="720" />
```

This project is build to showcased my expertise in creating React-Typescript web application. By leveraging a modular component design, separating ui and feature module. Also by building custom hooks to handle complex bussines logic.

## Tech Stack

- UI : React-Typescript
- Styling : Tailwind CSS v4.1
- Routing : React Router DOM
- Testing : Vitest, React Testing Library
- Data Fetching : Axios
- Build Tools : Vite

## REST API

In this project, the api that were used is [Github API](https://developer.github.com/v3/).

## Installation

To run this app locally you can follow this step :

1. Clone Repository
```bash
git clone https://github.com/okkyAdiansyah/github-repositories-explorer.git
```

2. Navigate to Project Directory
```bash
cd github-repositories-explorer
```
3. Install Dependencies
```bash
npm install
```

## Usage

Run this command on your terminal :
```bash
npm run dev
```
This will run a local development server and open the application in your browser.
If the browser did not open automatically, navigate to this [http://localhost:5173/](http://localhost:5173/)

## Testing

To run the test, you can run this :
```bash
npm run test
```
The testing directory is located at
```
├── src/
|
| ├──__test__/
| |
| | ├── components/
```
The test is only covering the module components because it can cover most of the component.
To write your own test, please follow this flow to manage its test based on render and event test
```js
describe('<Your Component />', () => {
  // Write your mock on top level of the test

  const setup = () => {
      return render(
        // Render your component in this setup function
      )
  }

  // Don't forget to clear all mocks before each test
  beforeEach(() => {
      vi.clearAllMocks();
  });

  describe('Render Test', () => {
    // Write your rendering test here
  });

  describe('Event Test', () => {
    // Write your event driven test here
  });
});
```

## Dependencies

This app is run using this dependencies:
- React Router DOM : To handle react routing without visible loading process. This dep also handle the redirect and set or get parameter
- Axios : To handle HTTP request without extra step like native fetch API
- Tailwind CSS : To handle component styling without managing complex css file.
- Vite : To handle react build fast and in efficient way.

## Project Structure

This app was developed using modular component approach, separating between plain-UI and 'smart' feature.

Custom hooks was created to handle complex bussines logic or to reused it on other component that might need it.

Services is storing axios service for fetching

Complex and reused type and interference are exported from its own directory

```
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── ...
│   │   ├── module/
│   │   │   └── ...
│   │   └── pages/
│   │   │   └── ...
│   ├── lib/
│   │   └── types
│   │   │   └── ...
│   │   │
│   │   └── services
│   │   │   └── ...
│   ├── hooks/
│   │   ├── ...
|   |   |
│   ├── utils/
│   │   │   └── ...
```

## Features

- Live Search Suggestion : When user typed on the search bar, it will showed 5 username that close to what user is typed
- Recent Search History : Saved everytime user search, can be removed if users want

## Technical Decision

- Mimicking fuzzy search

Github api route for search is ranked by its popularity not by the similar username, this can confuse user on the live search suggestion.
To tackle this, i choose this approach to mimick a fuzzy search :
```js
// https://api.github.com/search/users?q=+in:login&per_page=5&page=1
```

- Separate fetch

Because of different logic in fetching, i choose to separate into its own custom hooks :

1. useLiveSearch
Handling on feeding the user live suggestion with debounce to manage unnecessary re-render everytime search query is changed
```js
const useLiveSearch = (query: string) => {
  const [result, setResult] = useState<IUsernameResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({
      isError: false,
      errorMsg: ''
  });
  // Fetch handler
  const fetch = async (query: string) => {
      try {
          const res = await axios.get(`https://api.github.com/search/users?q=${query}+in:loginper_page=5`);
          const data: IGithubUser[] = res.data.items;
          const formatted: IUsernameResult[] = data.map((user) => ({
              username: user.login,
              repoUrl: user.repos_url,
              id: user.id
          }));
          setResult(formatted ?? []);
      } catch {
          setError({
              isError: true,
              errorMsg: 'Something went wrong! Please try again.'
          })
      } finally {
          setLoading(false);
      }
  }
  
  useEffect(() => {
      setLoading(true);
      const debounce = setTimeout(() => {
          if(query.trim() !== ''){
              fetch(query);
          } else {
              setLoading(false);
          }
      }, 500)
      
      return () => clearTimeout(debounce);
  }, [query]);
  
  return {result, loading, error}
}
```

2. useRepoFetch
Handling repositories fetch after the search result is showed. This hooks have a logic to only fetch after the accordion is active so it didn't fetched all result at once.

I choose this approach because imagine if it's more than 5 result with each result has more than 10 repositories.

Also i choose to cached it inside Map to mimic LRU stratiegies, and to provide scalability into future feature like infinite scroll or pagination.

```js
const useRepoFetch = (url: string, shouldFetch: boolean) => {
    const [result, setResult] = useState<IUserRepo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<TError>({
        isError: false,
        errorMsg: ''
    });

    const hasFetched = useRef(false);

    const fetch = async (url: string) => {
        try {
            const res = await axios.get(url);
            const data: IGithubRepo[] = res.data;

            const formatted: IUserRepo[] = data.map((user) => ({
                id: user.id,
                name: user.name,
                description: user.description,
                repoUrl: user.html_url,
                watchersCount: user.watchers_count
            }));

            setResult(formatted ?? []);
            hasFetched.current = true;
        } catch {
            setError({
                isError: true,
                errorMsg: 'Something went wrong! Please try again.'
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!shouldFetch || hasFetched.current || !url) return;
        
        const cached = cache.get(url);
        if(cached){
            setResult(cached);
            return;
        }

        setLoading(true);
        setError({ isError: false, errorMsg: "" });
        fetch(url);
    }, [url, shouldFetch]);

    return {result, loading, error}
}
```

3. useSearch
Handling user search after clicking the suggestion, search button, or enter.
```js
import { useState, useEffect } from "react";
import { type IUsernameResult, type IGithubUser, type IGitHubSearchResponse } from "@lib/types/resultTypes";
import axios from "axios";
import type { TError } from "./useLiveSearch";

const useSearch = (query: string, page: number = 1) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<IUsernameResult[]>([]);
    const [error, setError] = useState<TError>({
        isError: false,
        errorMsg: ''
    });

    const fetch = async (query: string, page: number) => {
        try {
            const res = await axios.get<IGitHubSearchResponse>(`https://api.github.com/search/users?q=${query}+in:login&per_page=5&page=${page}`);
            const data = res.data.items;
            const formatted: IUsernameResult[] = data.map((acc : IGithubUser) => ({username: acc.login, repoUrl: acc.repos_url, id: acc.id}));

            setResult(formatted);
        } catch {
            setError({
                isError: true,
                errorMsg: 'Something went wrong! Please try again.'
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!query){
            setResult([]);
            return;
        }

        setLoading(true);
        fetch(query, page);
    }, [query, page])

    return {loading, result, error}
}

export default useSearch;
```
After considering the rendundancies in 70% of this custom hooks. I was considered to refactor it into one single hook:
```js
const reducer = (state: TState, action: TAction) => {
    switch(action.type){
        case 'ADD_HISTORY': {
            const query = action.payload.trim();

            if(!query) return state;

            const noDupes = state.filter((q) => q !== query);
            const updated = [query, ...noDupes];

            return updated.slice(0, MAX_HISTORY);
        }

        case 'REMOVE_HISTORY': {
            return state.filter((q) => q !== action.payload);
        }

        default: {
            return state;
        }
    }
}

const useSearchQuery = () => {
    const [histories, dispatch] = useReducer(
        reducer,
        [],
        () => {
            const saved = localStorage.getItem('history');

            return saved ? JSON.parse(saved) : []
        }
    );
    
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const [ params, setParams ] = useSearchParams();
    const query = params.get('q');

    const handleSearchQuery = useCallback((q: string) => {
        if(pathname !== '/search'){
            navigate(`/search?q=${encodeURIComponent(q)}`);
        } else {
            setParams((prev) => {
                prev.set('q', q);
                return prev;
            })
            dispatch({type: 'ADD_HISTORY', payload: q})
        }
    }, [pathname, navigate, setParams]);

    const handleRemoveHistory = useCallback((q: string) => {
        dispatch({type: 'REMOVE_HISTORY', payload: q});
    }, []);

    const handleResetQuery = useCallback(() => {
        if(pathname === '/search') setParams((prev) => {
                prev.set('q', '');
                return prev;
            });
    }, [setParams, pathname]);

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(histories));
    }, [histories])

    return {
        query,
        histories,
        pathname,
        handleSearchQuery,
        handleResetQuery,
        handleRemoveHistory
    }
}
```

- Handling search via search param instead of state

This is purely because its what a real-world application would do. Also its persist between reload and offering capabilities to back/forward navigation
