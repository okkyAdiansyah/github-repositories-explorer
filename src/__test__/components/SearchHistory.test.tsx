/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, type Mock } from "vitest";
import SearchHistory from '@components/module/SearchHistory/SearchHistory';
import useSearchQuery from '@hooks/useSearchQuery';

vi.mock('@hooks/useSearchQuery', () => ({
    default: vi.fn()
}));

vi.mock('@components/ui/HistoryItem/HistoryItem', () => ({
    default: (props: any) => (
        <div data-testid="history">
            <button type="button" onClick={props.onClick} data-testid="history-item">{props.username}</button>
            <button type="button" onClick={props.onDelete} data-testid="history-delete">x</button>
        </div>
    )
}))

const mockedSearchQuery = useSearchQuery as Mock;

describe('<SearchHistory />', () => {
    const setup = () => {
        return render(
            <SearchHistory />
        )
    }

    beforeEach(() => {
        vi.clearAllMocks();
        mockedSearchQuery.mockReturnValue({
            histories: ["Test 1", "Test 2"],
            handleSearchQuery: vi.fn(),
            handleRemoveHistory: vi.fn()
        });
    })

    describe('Render Test', () => {
        it('Render history item if result is not empty', () => {
            setup();
            const history = screen.getAllByRole('listitem');

            expect(history).toHaveLength(2)
        });

        it('Render nothing if result is empty', () => {
            mockedSearchQuery.mockReturnValue({
                histories: [],
                handleSearchQuery: vi.fn(),
                handleRemoveHistory: vi.fn()
            });

            const { container } = setup();

            expect(container).toBeEmptyDOMElement();
            expect(screen.queryByRole('list')).not.toBeInTheDocument();
        });
    });

    describe('Event Test', () => {
        it('Run search when history clicked', () => {
            const handleSearchQuery = vi.fn();

            mockedSearchQuery.mockReturnValue({
                histories: ["Test 1", "Test 2"],
                handleSearchQuery,
                handleRemoveHistory: vi.fn()
            });

            setup();

            const historiItems = screen.getAllByTestId('history-item');

            fireEvent.click(historiItems[1])
            expect(handleSearchQuery).toHaveBeenCalled();
        })

        it('Run remove history when remove button clicked', () => {
            const handleRemoveHistory = vi.fn();

            mockedSearchQuery.mockReturnValue({
                histories: ["Test 1", "Test 2"],
                handleSearchQuery: vi.fn(),
                handleRemoveHistory
            });

            setup();

            const historiItems = screen.getAllByTestId('history-delete');

            fireEvent.click(historiItems[1])
            expect(handleRemoveHistory).toHaveBeenCalled();
        });
    });
})

