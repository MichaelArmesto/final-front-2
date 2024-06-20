import { render, screen, fireEvent } from "@testing-library/react";
import Bio from "./Bio";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";

const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim();

test("Debe mostrar la biografía de Bart por defecto", () => {
  render(<Bio />);
  expect(screen.getByText(normalizeText(INFO_SIMPSONS[NombresSimpsons.BART].descripcion))).toBeInTheDocument();
});

test("Debe cambiar la biografía cuando se hace clic en un botón", () => {
  render(<Bio />);
  
  const lisaButton = screen.getByText(NombresSimpsons.LISA);
  fireEvent.click(lisaButton);

  expect(screen.getByText(normalizeText(INFO_SIMPSONS[NombresSimpsons.LISA].descripcion))).toBeInTheDocument();
});

test("Debe resaltar el botón activo", () => {
  render(<Bio />);
  
  const lisaButton = screen.getByText(NombresSimpsons.LISA);
  fireEvent.click(lisaButton);

  expect(lisaButton).toHaveStyle("background-color: #fdd835");
});

test("Debe cambiar de biografía y estilos cuando se hace clic en diferentes botones", () => {
  render(<Bio />);
  
  const maggieButton = screen.getByText(NombresSimpsons.MAGGIE);
  fireEvent.click(maggieButton);
  expect(screen.getByText(normalizeText(INFO_SIMPSONS[NombresSimpsons.MAGGIE].descripcion))).toBeInTheDocument();
  expect(maggieButton).toHaveStyle("background-color: #fdd835");

  const homerButton = screen.getByText(NombresSimpsons.HOMER);
  fireEvent.click(homerButton);
  expect(screen.getByText(normalizeText(INFO_SIMPSONS[NombresSimpsons.HOMER].descripcion))).toBeInTheDocument();
  expect(homerButton).toHaveStyle("background-color: #fdd835");
  expect(maggieButton).toHaveStyle("background-color: white");
});
