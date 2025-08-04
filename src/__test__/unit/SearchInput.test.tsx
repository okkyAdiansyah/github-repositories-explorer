import SearchInput from "@components/ui/SearchInput/SearchInput";
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom';

describe('<SearchInput />', () => {
    const onChange = vi.fn();
    const onReset = vi.fn();
    const onKeyPress = vi.fn();

    const setup = (value: string = '') => {
        return render(
            <SearchInput
                onChange={onChange}
                onReset={onReset}
                onKeyPress={onKeyPress}
                value={value}
            />
        )
    }

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Render Test', () => {
        it('Render with value and placeholder', () => {
            const { getByPlaceholderText } = setup('test');
            const inputEl = getByPlaceholderText('Search...') as HTMLInputElement;
            
            expect(inputEl).toBeInTheDocument();
            expect(inputEl.value).toBe('test');
        });

        it('Not render reset button when value is empty', () => {
            const { queryByRole } = setup('');
            expect(queryByRole('button')).not.toBeInTheDocument();
        })
    });

    describe('Event Test', () => {
        it('Remove and add active styles when input is blur or focus', () => {
            const { getByPlaceholderText, container } = setup('');
            const inputEl = getByPlaceholderText('Search...');
            
            fireEvent.focus(inputEl);
            expect(container.firstChild).toHaveClass('border-white');

            fireEvent.blur(inputEl);
            expect(container.firstChild).toHaveClass('border-transparent');
        });

        it('Call onChange when user type', () => {
            const { getByPlaceholderText } = setup('');
            const inputEl = getByPlaceholderText('Search...');
            
            fireEvent.change(inputEl, {target : {value: 'test'}});
            expect(onChange).toHaveBeenCalled();
        });

        it('Call onKeyPress when user type', () => {
            const { getByPlaceholderText } = setup('');
            const inputEl = getByPlaceholderText('Search...');
            
            fireEvent.keyDown(inputEl, {key: 'Enter', code: 'Enter', charCode: 13});
            expect(onKeyPress).toHaveBeenCalled();
        });

        it('Reset value when button X is clicked', () => {
            const { getByRole } = setup('Reset this');
            const resetButton = getByRole('button');

            fireEvent.click(resetButton);
            expect(onReset).toHaveBeenCalled();
        });
    });
});