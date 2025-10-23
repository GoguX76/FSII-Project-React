import { render, screen } from '@testing-library/react'
import Button from '../src/components/Button'
test('muestra el texto del botón correctamente', () => {
render(<Button label="Presionar" />)
expect(screen.getByText('Presionar')).toBeInTheDocument()
})
export default function Button({ label }) {
return <button>{label}</button>
}

export default function Button({ label }) {
return <button>{label}</button>
}