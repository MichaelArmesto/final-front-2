import React from "react";
import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  BotonSuscribir,
  CotenedorTexto
} from "./styled";
import { SuscribeImage, CloseButton as Close } from "../../assets";

interface ModalSuscripcionProps {
  onClose: () => void;
}

const ModalSuscripcion: React.FC<ModalSuscripcionProps> = ({ onClose }) => (
  <ContenedorModal>
    <TarjetaModal>
      <CloseButton onClick={onClose}>
        <img src={Close} alt="close-button" />
      </CloseButton>
      <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
      <CotenedorTexto>
        <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
        <DescripcionModal>
          Suscríbete a nuestro newsletter y recibe noticias de
          nuestros personajes favoritos.
        </DescripcionModal>
        <BotonSuscribir
          onClick={() =>
            setTimeout(() => {
              alert("Suscripto!");
              onClose();
            }, 1000)
          }
        >
          Suscríbete
        </BotonSuscribir>
      </CotenedorTexto>
    </TarjetaModal>
  </ContenedorModal>
);

export default ModalSuscripcion;
