import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('Renders main page correctly', () => {
    it('Should render the page correctly', () => {
        render(<App />)

        const p = screen.queryByText('Click on the Vite and React logos to learn more')

        expect(p).toBeTruthy()
    });
});