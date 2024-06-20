import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import {
  BioContainer,
  ContenedorBotones,
  BotonBio,
  BioImagen,
  BioNombre,
  BioDescripcion
} from "./bioStyled";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick = (nombre: NombresSimpsons) => {
    setBioActiva(INFO_SIMPSONS[nombre]);
  };

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre) => {
      const isActive = bioActiva.id === nombre;
      return (
        <BotonBio
          key={nombre}
          onClick={() => onClick(nombre as NombresSimpsons)}
          activo={isActive}
        >
          {nombre}
        </BotonBio>
      );
    });
  };

  return (
    <BioContainer>
      <ContenedorBotones>{crearBotones()}</ContenedorBotones>
      <div>
        <div>
          <BioImagen
            src={bioActiva.image}
            alt={bioActiva.nombre}
          />
        </div>
        <div>
          <BioNombre>{bioActiva.nombre}</BioNombre>
          <BioDescripcion>{bioActiva.descripcion}</BioDescripcion>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
