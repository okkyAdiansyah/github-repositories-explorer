/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, type Mock } from "vitest";
import LiveSearch from '@components/module/LiveSearch';
import useSearchQuery from '@hooks/useSearchQuery';
import useFetchAPI from '@hooks/useFetchAPI';


vi.mock('@hooks/useSearchQuery', () => ({
    default: vi.fn()
}))

vi.mock('@hooks/useFetchAPI', () => ({
    default: vi.fn()
}))

const mockedFetchAPI = useFetchAPI as Mock
const mockedSearchQuery = useSearchQuery as Mock

vi.mock('@components/ui/SearchInput/SearchInput', () => ({
    default: (props: any) => (
    <input 
        type="search" 
        data-testid="search-input"
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyPress} 
    />)
}))

vi.mock('@components/ui/LiveSuggestion/LiveSuggestion', () => ({
    default: (props: any) => (
        <div data-testid="suggestion">{props.children}</div>
    )
}))

vi.mock('@components/ui/CustomOption/CustomOption', () => ({
    default: (props: any) => (
        <button data-testid="suggestion-item" onClick={props.onSelect}>{props.username}</button>
    )
}))

vi.mock('@components/ui/Button/Button', () => ({
    default: (props: any) => (
        <button type='submit' data-testid='submit' onClick={props.onClick}>{props.children}</button>
    )
}))

describe('<LiveSearch />', () => {
    const setup = () => {
        return render(<LiveSearch />);
    }

    beforeEach(() => {
        mockedFetchAPI.mockReturnValue({
            result: [
                {id: 1, username: 'Test 1'},
                {id: 2, username: 'Test 2'},
            ],
            loading: false,
            error: { isError: false, errorMsg: '' }
        });

        mockedSearchQuery.mockReturnValue({
            query: 'test',
            pathname: '/',
            handleSearchQuery: vi.fn(),
            handleResetQuery: vi.fn()
        });
    });

    describe('Render Test', () => {
        beforeEach(() => {
            vi.clearAllMocks();
        })

        it('Render the search bar', () => {
            setup();
            const searchInput = screen.getByRole('searchbox');
            const searchButton = screen.getByRole('button');

            expect(searchInput).toBeInTheDocument();
            expect(searchButton).toBeInTheDocument();
        });

        it('Render the live suggestion when user typing', async () => {
            setup();
            const input = screen.getByRole('searchbox');
            
            fireEvent.change(input, {target: {value: 'test'}});
            const suggestion = await screen.findByTestId('suggestion');

            expect(suggestion).toBeInTheDocument();
        });

        it('Render the suggestion item when user typing', async () => {
            setup();
            const input = screen.getByRole('searchbox');
            fireEvent.change(input, {target: {value: 'test'}});

            const suggestionItem = await screen.findAllByRole('listitem');
            expect(suggestionItem).toHaveLength(2);
        });

        it('Render the no result when result is empty', async () => {
            mockedFetchAPI.mockReturnValue({
                result: [],
                loading: false,
                error: { isError: false, errorMsg: '' }
            });

            setup();

            const input = screen.getByRole('searchbox');
            fireEvent.change(input, {target: {value: 'tes'}});

            const noResult = await screen.findByText('No users found.');
            expect(noResult).toBeInTheDocument();
        });
    });

    describe('Event Test', () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('Run the search when user press enter', () => {
            const handleSearchQuery = vi.fn();

            mockedSearchQuery.mockReturnValue({
                query: 'test',
                pathname: '/',
                handleSearchQuery,
                handleResetQuery: vi.fn()
            });

            setup();

            const input = screen.getByRole('searchbox');
            fireEvent.keyDown(input, {key: 'Enter'});

            expect(handleSearchQuery).toHaveBeenCalled();
        });

        it('Run the search when submit button is clicked', () => {
            const handleSearchQuery = vi.fn();

            mockedSearchQuery.mockReturnValue({
                query: 'test',
                pathname: '/',
                handleSearchQuery,
                handleResetQuery: vi.fn()
            });

            setup();

            const submit = screen.getByRole('button');
            fireEvent.click(submit);

            expect(handleSearchQuery).toHaveBeenCalled();
        });

        it('Run the search when suggestion item is clicked', async () => {
            const handleSearchQuery = vi.fn();

            mockedSearchQuery.mockReturnValue({
                query: 'test',
                pathname: '/',
                handleSearchQuery,
                handleResetQuery: vi.fn()
            });

            setup();

            const input = screen.getByRole('searchbox');
            fireEvent.change(input, {target: {value: 'test'}});

            const suggestionItems = await screen.findAllByTestId('suggestion-item');
            for (const item of suggestionItems){
                fireEvent.click(item);
                expect(handleSearchQuery).toHaveBeenCalled();
            }
        });
    });
});

