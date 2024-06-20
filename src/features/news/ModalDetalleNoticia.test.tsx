import { render, screen, fireEvent } from '@testing-library/react';
import ModalDetalleNoticia from './ModalDetalleNoticia';
import { mockNoticias } from '../../mocks/handlers';
import { INoticiasNormalizadas } from './types';

const mockNoticia: INoticiasNormalizadas = mockNoticias[0];

describe('ModalDetalleNoticia', () => {
  test('debe renderizar el modal con los detalles de la noticia', async () => {
    render(<ModalDetalleNoticia noticia={mockNoticia} onClose={() => {}} />);

    expect(await screen.findByText(mockNoticia.titulo)).toBeInTheDocument();

    expect(await screen.findByText((content, element) => {
      return element !== null && element.textContent === mockNoticia.descripcion;
    })).toBeInTheDocument();

    expect(screen.getByAltText("news-image")).toHaveAttribute('src', mockNoticia.imagen);
  });

  test('debe cerrar el modal al hacer clic en el botón de cerrar', async () => {
    const onCloseMock = jest.fn();
    render(<ModalDetalleNoticia noticia={mockNoticia} onClose={onCloseMock} />);

    fireEvent.click(screen.getByAltText('close-button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
