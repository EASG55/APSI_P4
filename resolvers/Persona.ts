import {PersonaModelType} from "../db/Persona.ts";
import {GraphQLError} from "graphql"

export const Persona = {
    tardisID: async (parent: PersonaModelType): Promise<PersonaModelType> => {
        const tardis = await PersonaModel.findById(parent.tardisID).exec();
        if(!tardis){
            throw new GraphQLError("No se encontró la Tardis", {
                extensions: { code: "NOT_FOUND" },
            });
        }
        return tardis;
},
};