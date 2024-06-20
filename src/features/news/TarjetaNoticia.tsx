import React from "react";
import {
  TarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  BotonLectura
} from "./styled";
import { INoticiasNormalizadas } from "./types";

interface TarjetaNoticiaProps {
  noticia: INoticiasNormalizadas;
  onVerMas: (noticia: INoticiasNormalizadas) => void;
  'data-testid'?: string;
}

const TarjetaNoticiaComponent: React.FC<TarjetaNoticiaProps> = ({ noticia, onVerMas, ...props }) => (
  <TarjetaNoticia {...props}>
    <ImagenTarjetaNoticia src={noticia.imagen} />
    <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
    <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
    <DescripcionTarjetaNoticia>
      {noticia.descripcionCorta}
    </DescripcionTarjetaNoticia>
    <BotonLectura onClick={() => onVerMas(noticia)} data-testid="ver-mas">Ver más</BotonLectura>
  </TarjetaNoticia>
);

export default TarjetaNoticiaComponent;
