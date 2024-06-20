import { render, screen, fireEvent, waitFor } from "../../test-utils";
import Cita from "./Cita";
import { server } from "../../mocks/server";
import { rest } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Pruebas en Cita", () => {
  test("Debe verificar que la cita sea del personaje ingresado", async () => {
    server.use(
      rest.get("https://thesimpsonsquoteapi.glitch.me/quotes", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              quote: "Back in Edinburg, we had a coal miners strike. All we wanted were hats with a wee light on top. Then one day the mine collapsed. No one made it out alive, not even Willie!",
              character: "Lisa Simpson",
              image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FGroundskeeperWillie.png?1497567512063",
              characterDirection: "Right"
            }
          ])
        );
      })
    );

    render(<Cita />);

    const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
    fireEvent.change(input, { target: { value: "Lisa" } });

    const boton = screen.getByText(/Obtener Cita/i);
    fireEvent.click(boton);

    await waitFor(() => {
      expect(screen.getByText(/Lisa Simpson/i)).toBeInTheDocument();
    });
  });

  test("Obtener cita aleatoria", async () => {
    server.use(
      rest.get("https://thesimpsonsquoteapi.glitch.me/quotes", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              quote: "All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.",
              character: "Homer Simpson",
              image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
              characterDirection: "Right"
            }
          ])
        );
      })
    );

    render(<Cita />);

    const boton = screen.getByText(/Obtener cita aleatoria/i);
    fireEvent.click(boton);

    await waitFor(() => {
      expect(screen.getByText(/Homer Simpson/i)).toBeInTheDocument();
    });

    screen.debug();
  });

  test("Mostrar mensaje de error si se ingresa un valor numérico", async () => {
    render(<Cita />);

    const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
    fireEvent.change(input, { target: { value: "123" } });

    const boton = screen.getByText(/Obtener Cita/i);
    fireEvent.click(boton);

    await waitFor(() => {
      expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
    });
  });
});
