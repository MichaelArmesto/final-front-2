import React from "react";
import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  CotenedorTexto
} from "./styled";
import { INoticiasNormalizadas } from "./types";
import { CloseButton as Close } from "../../assets";

interface ModalDetalleNoticiaProps {
  noticia: INoticiasNormalizadas;
  onClose: () => void;
}

const ModalDetalleNoticia: React.FC<ModalDetalleNoticiaProps> = ({ noticia, onClose }) => (
  <ContenedorModal>
    <TarjetaModal>
      <CloseButton onClick={onClose}>
        <img src={Close} alt="close-button" />
      </CloseButton>
      <ImagenModal src={noticia.imagen} alt="news-image" />
      <CotenedorTexto>
        <TituloModal>{noticia.titulo}</TituloModal>
        <DescripcionModal>{noticia.descripcion}</DescripcionModal>
      </CotenedorTexto>
    </TarjetaModal>
  </ContenedorModal>
);

export default ModalDetalleNoticia;
