import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PopupWindow from '../src/components/popupWindow/PopupWindow';
import { describe, it, afterEach, expect, vi } from 'vitest';

describe('PopupWindow', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        onAccept: vi.fn(),
        onCancel: vi.fn(),
        title: 'Test Popup',
        buttonText: 'Confirm',
        children: <p>Popup content here</p>,
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly when open', () => {
        render(<PopupWindow {...defaultProps} />);
        expect(screen.getByText('Test Popup')).toBeDefined();
        expect(screen.getByText('Popup content here')).toBeDefined();
    });

    it('does not render when closed', () => {
        render(<PopupWindow {...defaultProps} isOpen={false} />);
        expect(screen.queryByText('Test Popup')).toBeNull();
    });

    it('calls onClose when close icon is clicked', () => {
        render(<PopupWindow {...defaultProps} />);
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
        expect(defaultProps.onClose).toHaveBeenCalled();
    });
});
