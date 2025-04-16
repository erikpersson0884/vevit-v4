import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PopupWindow from '../src/components/popupWindow/PopupWindow';

describe('PopupWindow', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onAccept: jest.fn(),
    onCancel: jest.fn(),
    title: 'Test Popup',
    buttonText: 'Confirm',
    children: <p>Popup content here</p>,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<PopupWindow {...defaultProps} />);
    expect(screen.getByText('Test Popup')).toBeInTheDocument();
    expect(screen.getByText('Popup content here')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<PopupWindow {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Popup')).not.toBeInTheDocument();
  });

  it('calls onClose when close icon is clicked', () => {
    render(<PopupWindow {...defaultProps} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onAccept when accept button is clicked', () => {
    render(<PopupWindow {...defaultProps} />);
    const acceptButton = screen.getByText('Confirm');
    fireEvent.click(acceptButton);
    expect(defaultProps.onAccept).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<PopupWindow {...defaultProps} />);
    const cancelButton = screen.getByText(/Avbryt/i);
    fireEvent.click(cancelButton);
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });
});
