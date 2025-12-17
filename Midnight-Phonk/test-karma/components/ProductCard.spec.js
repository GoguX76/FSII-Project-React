import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../src/components/productCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 100,
    image: 'test.jpg',
    desc: 'Test Description'
  };

  it('should render product details correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$100')).toBeTruthy();
    expect(screen.getByText('Test Description')).toBeTruthy();
  });

  it('should render "Gratis" when price is 0', () => {
    const freeProduct = { ...mockProduct, price: 0 };
    render(<ProductCard product={freeProduct} />);
    expect(screen.getByText('Gratis')).toBeTruthy();
  });

  it('should call onSelect when clicked', () => {
    const onSelectSpy = jasmine.createSpy('onSelect');
    render(<ProductCard product={mockProduct} onSelect={onSelectSpy} />);
    
    // Click on the title which is inside the card
    fireEvent.click(screen.getByText('Test Product'));

    expect(onSelectSpy).toHaveBeenCalledWith(mockProduct);
  });
});
