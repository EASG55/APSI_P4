import { GraphQLError } from "graphql"; 
import { TardisModel } from "../db/Tardis.ts";
import { DimensionModel } from "../db/Dimension.ts";
import { PlanetaModel } from "../db/Planeta.ts";
import { PersonaModel } from "../db/Persona.ts";
import {Tardis, Dimension, Planeta, Persona} from "../types.ts";

export const Query = {
    getTardis: async (_parent: unknown, args: { id: string }) => {
        try{
            const { id } = args;
            const tardis = await TardisModel.findById(id).populate({path:"dimensionesID",populate:({path:"planetasID",populate:("personasID")})}).exec();
            if (!tardis) {
                throw new GraphQLError("No se encontró la Tardis", {
                    extensions: { code: "NOT_FOUND" },
                });
            }

            return {
                id: tardis.id.toString(),
                camuflaje: tardis.camuflaje,
                regeneracion: tardis.regeneracion,
                anoActual: tardis.anoActual,
                dimensiones: tardis.dimensionesID.map((dimension) => {
                    return {
                        id: dimension.id.toString(),
                        nombre: dimension.nombre,
                        planetas: dimension.planetasID.map((planeta) => {
                            return {
                                id: planeta.id.toString(),
                                nombre: planeta.nombre,
                                personas: planeta.personasID.map((persona) => {
                                    return {
                                        id: persona.id.toString(),
                                        nombre: persona.nombre,
                                    };
                                }),
                            };
                        }),
                    };
                }),
            };


        }catch(err){
            throw new GraphQLError(err.message);
        }
        },

    getDimension: async (_parent: unknown, args: { id: string }): Promise<Dimension> => {
            const {id} = args;
            const dimension = await DimensionModel.findById(id).populate({path:"planetasID",populate:("personasID")}).exec();
            if(!dimension){
                throw new GraphQLError("No se encontró la Dimension", {
                    extensions: { code: "NOT_FOUND" },
                });

            }

            return {
                id: dimension.id.toString(),
                nombre: dimension.nombre,
                planetas: dimension.planetasID.map((planeta) => {
                    return {
                        id: planeta.id.toString(),
                        nombre: planeta.nombre,
                        personas: planeta.personasID.map((persona) => {
                            return {
                                id: persona.id.toString(),
                                nombre: persona.nombre,
                            };
                        }),
                    };
                }),
            };
 
    },

    getPlaneta: async (_parent: unknown, args: { id: string }): Promise<Planeta> => {
        
            const { id } = args;
            const planeta = await PlanetaModel.findById(id).populate("personasID").exec();
            if (!planeta) {
                throw new GraphQLError("No se encontró el Planeta", {
                    extensions: { code: "NOT_FOUND" },
                });
            }

            return {
                id: planeta.id.toString(),
                nombre: planeta.nombre,
                personas: personas.map((persona) => {
                    return {
                        id: persona.id.toString(),
                        nombre: persona.nombre,
                    };
                }),
            
            }
        
    
       
    },
        

    getPersona: async (_parent: unknown, args: { id: string }) => {
            const persona = await PersonaModel.findById({_id: args.id}).exec();
            if(!persona){
                throw new GraphQLError("No se encontró la Persona", {
                    extensions: { code: "NOT_FOUND" },
                });

            }
            return {
                id: persona.id.toString(),
                nombre: persona.nombre,
            };
            },
        
    

        allTardis: async (): Promise<TardisModelType[]> => {
            const tardis = await TardisModel.find().populate({path:"dimensionesID",populate:({path:"planetasID",populate:("personasID")})}).exec();

            return tardis.map((tardis) => {
                return {
                    id: tardis.id.toString(),
                    camuflaje: tardis.camuflaje,
                    regeneracion: tardis.regeneracion,
                    anoActual: tardis.anoActual,
                    dimensiones: tardis.dimensionesID.map((dimension) => {
                        return {
                            id: dimension.id.toString(),
                            nombre: dimension.nombre,
                            planetas: dimension.planetasID.map((planeta) => {
                                return {
                                    id: planeta.id.toString(),
                                    nombre: planeta.nombre,
                                    personas: planeta.personasID.map((persona) => {
                                        return {
                                            id: persona.id.toString(),
                                            nombre: persona.nombre,
                                        };
                                    }),
                                };
                            }),
                        };
                    }),
                };
            });
    
        },

        };