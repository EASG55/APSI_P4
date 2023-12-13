import {TardisModel, TardisModelType} from "../db/Tardis.ts";
import {DimensionModelType, DimensionModel} from "../db/Dimension.ts";

import {GraphQLError} from "graphql"

export const Tardis = {
    dimensionesID: async (parent: TardisModelType): Promise<DimensionModelType[]> => {
        const dimension = await DimensionModel.find({dimensionesID: parent.id});
        if(!dimension){
            throw new GraphQLError("No se encontró la Dimension", {
                extensions: { code: "NOT_FOUND" },
            });
        }
        return dimension;
},
};