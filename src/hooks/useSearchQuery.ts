import { useCallback, useEffect, useReducer, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type TAction = 
    | {type: 'ADD_HISTORY'; payload: string}
    | {type: 'REMOVE_HISTORY'; payload: string}

type TState = string[];

const MAX_HISTORY = 3;

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
    const throttle = useRef<NodeJS.Timeout | null>(null);

    const handleSearchQuery = useCallback((q: string) => {
        dispatch({type: 'ADD_HISTORY', payload: q});

        if(pathname !== '/search'){
            throttle.current = setTimeout(() => {
                navigate(`/search?q=${encodeURIComponent(q)}`);
            }, 100);
        } else {
            setParams((prev) => {
                prev.set('q', q);
                return prev;
            });
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

        return () => {
            if(throttle.current){
                clearTimeout(throttle.current);
            }
        }
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

export default useSearchQuery;