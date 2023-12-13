import {DimensionModel, DimensionModelType} from "../db/Dimension.ts";
import {PlanetaModelType, PlanetaModel} from "../db/Dimension.ts";

import {GraphQLError} from "graphql"

export const Dimension = {
    planetasID: async (parent: DimensionModelType): Promise<PlanetaModelType[]> => {
        const planetas = await PlanetaModel.findById(parent.planetasID).exec();
        if(!planetas){
             throw new GraphQLError("No se encontró el Planeta", {
                 extensions: { code: "NOT_FOUND" },
             });
         }
        return planetas;
},
};