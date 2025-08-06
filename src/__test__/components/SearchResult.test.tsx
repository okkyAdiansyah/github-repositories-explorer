/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from "vitest";
import SearchResult from '@components/module/SearchResult/SearchResult';

vi.mock('@components/module/Accordion/Accordion', () => ({
    default: (props: any) => (
        <div>
            <button onClick={props.onClick} data-testid={`toggle-${props.id}`}>{props.username}</button>
            {props.activeAccordion === `user-${props.id}` && 
                <div data-testid={`accordion-${props.id}`}>Content for {props.username}</div>
            }
        </div>
    )
}))

describe('<SearchResult />', () => {
    const mockUsers = [
        {id: 1, username: "TestUser1", repoUrl: "Link"},
        {id: 2, username: "TestUser1", repoUrl: "Link"},
    ]

    const setup = () => {
        return render(
            <SearchResult users={mockUsers} />
        )
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Render Test', () => {
        it('Render correct number of search result', () => {
            setup();
            const items = screen.getAllByRole('listitem');

            expect(items).toHaveLength(2);
        });
    });

    describe('Event Test', () => {
        it('Should toggle between accordion', () => {
            setup();
            expect(screen.getByTestId('accordion-1')).toBeInTheDocument();
            expect(screen.queryByTestId('accordion-2')).not.toBeInTheDocument();

            fireEvent.click(screen.getByTestId('toggle-2'));

            expect(screen.queryByTestId('accordion-1')).not.toBeInTheDocument();
            expect(screen.getByTestId('accordion-2')).toBeInTheDocument();
        })
    });
})