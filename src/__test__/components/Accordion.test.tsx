/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from "vitest";
import Accordion from '@components/module/Accordion';
import useFetchAPI from '@hooks/useFetchAPI';
import '@testing-library/jest-dom';

vi.mock('@hooks/useFetchAPI', () => ({
    default: vi.fn()
}));

describe('<Accordion />', () => {

    const defaultProps = {
        onClick: vi.fn(),
        activeAccordion: 'user-1',
        username: 'octocat',
        id: 1,
        repoUrl: 'https://api.github.com/users/octocat/repos'
    }



    const setup = (customProps = {}) => {
        const props = {...defaultProps, ...customProps};
        return render(<Accordion {...props} />);
    };

    beforeEach(() => {
        vi.clearAllMocks();
    })

    describe('Render Test', () => {
        it('Render loading fallback when fetching', () => {
            (useFetchAPI as any).mockReturnValue({
                result: [],
                loading: true,
                error: { isError: true, errorMsg: 'Failed to fetch' }
            });

            setup();
            const loading = screen.getByTestId('loading');

            expect(loading).toBeInTheDocument();
        })

        it('Render error fallback when fetching failed', () => {
            (useFetchAPI as any).mockReturnValue({
                result: [],
                loading: false,
                error: { isError: true, errorMsg: 'Failed to fetch' }
            });

            setup();
            const error = screen.getByTestId('error');

            expect(error).toBeInTheDocument();
        })

        it('Render no result fallback when result return empty', () => {
            (useFetchAPI as any).mockReturnValue({
                result: [],
                loading: false,
                error: { isError: false, errorMsg: '' }
            });

            setup();
            const noResult = screen.getByText('No Repositories Found.');

            expect(noResult).toBeInTheDocument();
        })

        it('Render the correct number of user list', () => {
            (useFetchAPI as any).mockReturnValue({
                result: [
                    {id: 1, username: 'test'},
                    {id: 2, username: 'test'},
                ],
                loading: false,
                error: { isError: false, errorMsg: '' }
            });

            setup();
            const resultList = screen.getAllByRole('listitem');

            expect(resultList).toHaveLength(2);
        })

        it('Should close when is Active is false', () => {
            (useFetchAPI as any).mockReturnValue({
                result: [
                    {id: 1, username: 'test'},
                    {id: 2, username: 'test'},
                ],
                loading: false,
                error: { isError: false, errorMsg: '' }
            });

            setup({activeAccordion: 'user-2'});
            const accordionBody = screen.getByRole('list');

            expect(accordionBody).toHaveClass('max-h-0');
        })
    })
    
    describe('Event Test', () => {
        it('Should run onClick when clicked', () => {
            (useFetchAPI as any).mockReturnValue({
                result: [
                    {id: 1, username: 'test'},
                    {id: 2, username: 'test'},
                ],
                loading: false,
                error: { isError: false, errorMsg: '' }
            });

            setup();
            const button = screen.getByRole('button');
            fireEvent.click(button);

            expect(defaultProps.onClick).toHaveBeenCalled();
        })
    })
})