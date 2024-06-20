import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";
import TarjetaNoticiaComponent from "./TarjetaNoticia";
import ModalSuscripcion from "./ModalSuscripcion";
import ModalDetalleNoticia from "./ModalDetalleNoticia";
import { INoticiasNormalizadas } from "./types";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      try {
        const respuesta = await obtenerNoticias();
        //console.log("Noticias obtenidas:", respuesta);

        const data = respuesta.map((n) => {
          const titulo = n.titulo
            .split(" ")
            .map((str) => {
              return str.charAt(0).toUpperCase() + str.slice(1);
            })
            .join(" ");

          const ahora = new Date();
          const minutosTranscurridos = Math.floor(
            (ahora.getTime() - new Date(n.fecha).getTime()) / 60000
          );

          //console.log('minutosTranscurridos', minutosTranscurridos);

          return {
            id: n.id,
            titulo,
            descripcion: n.descripcion,
            fecha: `Hace ${minutosTranscurridos} minutos`,
            esPremium: n.esPremium,
            imagen: n.imagen,
            descripcionCorta: n.descripcion.substring(0, 100),
          };
        });

        setNoticias(data);
        //console.log("Noticias transformadas:", data);
      } catch (error) {
        setError("Error al cargar las noticias");
      }
    };

    obtenerInformacion();
  }, []);

  const handleVerMas = (noticia: INoticiasNormalizadas) => {
    setModal(noticia);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <div key={n.id} data-testid="noticia">
            <TarjetaNoticiaComponent noticia={n} onVerMas={handleVerMas} />
          </div>
        ))}
        {modal && (
          modal.esPremium ? (
            <ModalSuscripcion onClose={handleCloseModal} />
          ) : (
            <ModalDetalleNoticia noticia={modal} onClose={handleCloseModal} />
          )
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
