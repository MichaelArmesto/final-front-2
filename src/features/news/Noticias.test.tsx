import { render, screen, waitFor } from "@testing-library/react";
import Noticias from "./Noticias";
import { server } from "../../mocks/server";
import { mockNoticias } from "../../mocks/handlers";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("debe renderizar la lista de noticias correctamente", async () => {
  render(<Noticias />);

  await waitFor(() => {
    screen.debug();
  });

  const noticias = await screen.findAllByTestId('noticia');
  //console.log('noticias.lenght', noticias.length);
  //console.log('mockNoticias.lenght', mockNoticias.length);
  expect(noticias.length).toBe(mockNoticias.length);

  for (let i = 0; i < mockNoticias.length; i++) {
    const noticia = mockNoticias[i];
    const tituloElement = await screen.findByText(new RegExp(noticia.titulo, 'i'));
    expect(tituloElement).toBeInTheDocument();

    const minutosTranscurridos = Math.floor((new Date().getTime() - new Date(noticia.fecha).getTime()) / 60000);
    const fechaElement = await screen.findAllByText(`Hace ${minutosTranscurridos} minutos`);
    //console.log('fechaElement', fechaElement);
    expect(fechaElement.length).toBeGreaterThan(0); // Al menos un elemento debe coincidir
    console.log("fechaElement.length", fechaElement.length);
  }
   // Verificar específicamente los elementos con "Hace 20 minutos"
   const veinteMinutosElements = await screen.findAllByText('Hace 20 minutos');
   console.log("veinteMinutosElements.length", veinteMinutosElements.length);
   expect(veinteMinutosElements.length).toBe(2); // Deberían ser exactamente dos*/
});
