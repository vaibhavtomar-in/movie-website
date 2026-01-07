import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component Tests', () => {
  
  it('should render navbar with custom site name', () => {
    render(<Navbar siteName="My Movies" />);
    
    const siteName = screen.getByText('My Movies');
    expect(siteName).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
    expect(screen.getByText('My List')).toBeInTheDocument();
  });

  it('should render search input', () => {
    render(<Navbar />);
    
    const searchInput = screen.getByPlaceholderText('Search movies...');
    expect(searchInput).toBeInTheDocument();
  });
});