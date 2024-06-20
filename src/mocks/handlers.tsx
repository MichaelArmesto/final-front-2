import { rest } from 'msw';

export const citaPersonaje = [
  {
    quote: "Back in Edinburg, we had a coal miners strike. All we wanted were hats with a wee light on top. Then one day the mine collapsed. No one made it out alive, not even Willie!",
    character: "Lisa Simpson",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FGroundskeeperWillie.png?1497567512063",
    characterDirection: "Right"
  }
];

export const citaRandom = [
  {
    quote: "All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.",
    character: "Homer Simpson",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
    characterDirection: "Right"
  }
];

export const mockNoticias = [
  {
    id: 1,
    titulo: "Los Simpson 'predijeron' escasez de combustible",
    descripcion: `La más reciente es una teoría de que un episodio de 2010 del programa,
    titulado "Lisa Simpson, esta no es tu vida", predijo la crisis de combustible en el Reino Unido.
    Tras los informes de escasez de más de 100.000 vehículos, muchos conductores han estado comprando
    gasolina por pánico, lo que ha llevado a estaciones vacías apenas unas horas después de abiertas.
    Esto ha sido comparado con la escena de Los Simpson en la que se puede ver a Homero llenando el 
    maletero de su coche con 1,000 galones de combustible para ganar un juguete promocional para su hija Maggie.`,
    fecha: new Date(new Date().getTime() - 5 * 60000).toISOString(), // Hace 5 minutos
    esPremium: false,
    imagen: "https://i2-prod.mirror.co.uk/incoming/article25142408.ece/ALTERNATES/s615b/0_SIMPSONSJPG.jpg",
    descripcionCorta: `La más reciente es una teoría de que un episodio de 2010 del programa,
    titulado "Lisa Simpson, e`
  },
  {
    id: 2,
    titulo: "Los Simpsons se asocian con Marvel",
    descripcion: `Los Simpson se han asociado con Marvel para lanzar un nuevo corto exclusivo de Disney+. 
    "The Good, The Bart y The Loki" estará disponible exclusivamente para ver por aquellos que están registrados 
    en el servicio de suscripción.`,
    fecha: new Date(new Date().getTime() - 20 * 60000).toISOString(), // Hace 20 minutos
    esPremium: false,
    imagen: "https://i2-prod.mirror.co.uk/incoming/article24436503.ece/ALTERNATES/n310p/0_DISNEY.jpg",
    descripcionCorta:`Los Simpson se han asociado con Marvel para lanzar un nuevo corto exclusivo de Disney+. 
    "The Go`
  },
  {
    id: 3,
    titulo: "Los Simpson mostraron a Richard Branson en el espacio en un episodio de 2014",
    descripcion: `Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.`,
    fecha: new Date(new Date().getTime() - 20 * 60000).toISOString(), // Hace 20 minutos
    esPremium: true,
    imagen: "https://i2-prod.mirror.co.uk/incoming/article24547200.ece/ALTERNATES/s615b/0_EHP_CHP_160721The-Simpsons_53631JPG.jpg",
    descripcionCorta:`En un capítulo que se emitió por primera vez en 2014, un Richard
    Branson animado se reclinó y so`
  }
];

export const handlers = [
  rest.get("https://thesimpsonsquoteapi.glitch.me/quotes", (req, res, ctx) => {
    const data = req.url.searchParams.get('character') ? citaPersonaje : citaRandom;
    console.log('Ejecutando desde msw', data);
    return res(
      ctx.status(200),
      ctx.json(data)
    );
  }),
  rest.get('/api/noticias', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockNoticias)
    );
  })
];
