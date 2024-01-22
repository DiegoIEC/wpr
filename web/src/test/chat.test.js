import { render, screen } from '@testing-library/react';
import Chat from '../Chat';
import { useAuth } from './globals/auth';

// Mock the useAuth hook since it uses Firebase and we want to isolate the component
jest.mock('../globals/auth', () => ({
  useAuth: jest.fn(),
}));

// Mock the Firebase app and database since we don't want to use the actual Firebase in tests
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getDatabase: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  onValue: jest.fn(),
  push: jest.fn(),
  serverTimestamp: jest.fn(),
}));

describe('Chat Component', () => {
  // Mock user authentication data
  const mockUser = {
    userId: 'user1',
  };

  beforeEach(() => {
    // Provide the mock implementation for useAuth
    useAuth.mockImplementation(() => ({
      user: mockUser,
      loading: false,
      logout_user: jest.fn(),
    }));
  });

  it('dat de toggle button te zien is', () => {
    render(<Chat />);
    const toggleButton = screen.getByRole('button', { name: /toggle chat/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('opent chatbox wanneer knop gedrukt wordt', () => {
    render(<Chat />);
    const toggleButton = screen.getByRole('button', { name: /toggle chat/i });
    fireEvent.click(toggleButton); // Simuleert een muisklik op de toggle knop
  
    const chatPopup = screen.getByText(/chat header/i); // Zoekt naar de chat header in het document
    expect(chatPopup).toBeInTheDocument(); // Verwacht dat de chat popup in het document aanwezig is
  });
  });
