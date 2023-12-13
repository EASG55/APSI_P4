import {PlanetaModelType, PlanetaModel} from "../db/Planeta.ts";
import {PersonaModelType, PersonaModel} from "../db/Persona.ts";

import {GraphQLError} from "graphql"

export const Planeta = {
    personasID: async (parent: PlanetaModelType): Promise<PersonaModelType[]> => {
        const personas = await PersonaModel.findById(parent.personasID).exec();
        if(!personas){
             throw new GraphQLError("No se encontró la Persona", {
                 extensions: { code: "NOT_FOUND" },
             });
         }
        return personas;
},
};
