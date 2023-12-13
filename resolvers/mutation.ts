import { GraphQLError } from "graphql"; 
import mongoose from "mongoose";
import { TardisModel, TardisModelType } from "../db/Tardis.ts";
import { DimensionModel, DimensionModelType } from "../db/Dimension.ts";
import { PlanetaModel, PlanetaModeType } from "../db/Planeta.ts";
import { PersonaModel, PersonaModelType } from "../db/Persona.ts";
import {Tardis, Dimension, Planeta, Persona} from "../types.ts";

import {Tardis} from "../resolvers/Tardis.ts";

export const Mutation = {
    putTardis: async (_parent: unknown, args: { id: string, camuflaje: string, regeneracion: number, anoActual: number, dimensionesID: string[] }): Promise<TardisModelType> => {
        

        console.log(args.dimensionesID)

        const GrupoDimensiones = await Promise.all(args.dimensionesID.map(async (dimensionesID) => {
            const dimension = await DimensionModel.findById(dimensionesID).populate({path: "planetasID", populate: {path: "personasID"}}).exec();
            if (!dimension) {
              throw new GraphQLError("No se encontró la Dimension o la ID es nula", {
                extensions: { code: "NOT_FOUND" },
              });
            }
            return dimension;
          }));



          const newTardis = await TardisModel.findByIdAndUpdate(
            args.id, 
            {camuflaje: args.camuflaje, regeneracion: args.regeneracion, anoActual: args.anoActual, dimensiones: args.dimensionesID}, 
            { new: true }).exec();

            if(!newTardis){
                throw new GraphQLError("No se encontró la Tardis", {
                    extensions: { code: "NOT_FOUND" },
                });
            }

            return {
                id: newTardis._id.toString(),
                camuflaje: newTardis.camuflaje,
                regeneracion: newTardis.regeneracion,
                anoActual: newTardis.anoActual,
                dimensiones: GrupoDimensiones.map((dimension) => {
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
                }
                ),
            }
    
    },

    putDimension: async (_parent: unknown, args: { id: string, nombre: string, planetasID: string[] }): Promise<DimensionModelType> => {

        const GrupoPlanetas = await Promise.all(args.planetasID.map(async (planetasID) => {
            const planeta = await PlanetaModel.findById(planetasID).populate({path: "personasID"}).exec();
            if(!planeta){
                throw new GraphQLError("No se encontró el Planeta", {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return planeta;
            }
        ));


            const newDimension = await DimensionModel.findByIdAndUpdate(
                args.id, 
                {nombre: args.nombre, planetas: args.planetasID}, 
                { new: true, runValidators: true }).exec();
            if(!newDimension){
                throw new GraphQLError("No se encontró la Dimension", {
                    extensions: { code: "NOT_FOUND" },
                });
            }

            return{
                id: newDimension._id.toString(),
                nombre: newDimension.nombre,
                planetas: GrupoPlanetas.map((planeta) => {
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
            }
        
    },


    putPlaneta: async (_parent: unknown, args: { id: string, nombre: string, personasID: string[] }): Promise<PlanetaModelType> => {
        const grupoPersonas = await Promise.all(planetas.personas.map(async (personasID) => {
            const persona = await PersonaModel.findById(personasID).exec();
            if(!persona){
                throw new GraphQLError("No se encontró la Persona", {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return persona;
          }));

            

            const newPlaneta = await PlanetaModel.findByIdAndUpdate(
                args.id, 
                {nombre: args.nombre, personas: args.personasID}, 
                { new: true }).exec();

            if(!newPlaneta){
                throw new GraphQLError("No se encontró el Planeta", {
                    extensions: { code: "NOT_FOUND" },
                });
            }

            return {
                id: newPlaneta._id.toString(),
                nombre: newPlaneta.nombre,
                personas: grupoPersonas.map((persona) => {
                    return {
                        id: persona.id.toString(),
                        nombre: persona.nombre,
                    };

                }
                ),
            }
       
    },

    putPersona: async (_parent: unknown, args: { id: string, nombre: string }): Promise<PersonaModel> => {
        try{
            const newPersona = await PersonaModel.findByIdAndUpdate(
                args.id, 
                {nombre: args.nombre}, 
                { new: true })
                .exec();
            if(!newPersona){
                throw new GraphQLError("No se encontró la Persona", {
                    extensions: { code: "NOT_FOUND" },
                });
            }

            return personaModelToPersona(newPersona);
        }catch(err){
            throw new GraphQLError(err.message);
        }
    },

    deleteTardis: async (_parent: unknown, args: { id: string }): Promise<TardisModelType> => {
          const tardis = await TardisModel.findByIdAndDelete(args.id).populate({path: "dimensionesID", populate: {path: "planetasID", populate: {path: "personasID"}}}).exec();
          if (!tardis) {
            throw new GraphQLError("No se encontró la Tardis", {
              extensions: { code: "NOT_FOUND" },
            });
          }

      
          return {
            id: tardis._id.toString(),
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
        
      },
      

    deleteDimension: async (_parent: unknown, args: { id: string }): Promise<DimensionModelType> => {
        const dimension = await DimensionModel.findByIdAndDelete(args.id).populate({path: "planetasID", populate: {path: "personasID"}}).exec();
        if(!dimension){
            throw new GraphQLError("No se encontró la Dimension", {
                extensions: { code: "NOT_FOUND" },
            });
        }

        return {
            id: dimension._id.toString(),
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
        }
    },

    deletePlaneta: async (_parent: unknown, args: { id: string }): Promise<PlanetaModelType> => {

        const planeta = await PlanetaModel.findByIdAndDelete(args.id).populate({path: "personasID"}).exec();
        if(!planeta){
            throw new GraphQLError("No se encontró el Planeta", {
                extensions: { code: "NOT_FOUND" },
            });
        }


        return {
            id: planeta._id.toString(),
            nombre: planeta.nombre,
            personas: planeta.personasID.map((persona) => {
                return {
                    id: persona.id.toString(),
                    nombre: persona.nombre,
                };
            }),
        }
    },

    deletePersona: async (_parent: unknown, args: { id: string }): Promise<PersonaModelType> => {
            const persona = await PersonaModel.findByIdAndDelete(args.id).exec();
            if(!persona){
                throw new GraphQLError("No se encontró la Persona", {
                    extensions: { code: "NOT_FOUND" },
                });

            }
            return {
                id: persona._id.toString(),
                nombre: persona.nombre,
            }
       
    },

    postTardis: async (_parent: unknown, args: { camuflaje: string, regeneracion: number, anoActual: number, dimensionesID: string[] }): Promise<TardisModelType> => {
        
        const tardises = {
          camuflaje: args.camuflaje,
          regeneracion: args.regeneracion,
          anoActual: args.anoActual,
          dimensiones: args.dimensionesID,
        };

        const GrupoDimensiones = await Promise.all(tardises.dimensiones.map(async (dimensionesID) => {
            const dimension = await DimensionModel.findById(dimensionesID).populate({path: "planetasID", populate: {path: "personasID"}}).exec();
            if (!dimension) {
              throw new GraphQLError("No se encontró la Dimension o la ID es nula", {
                extensions: { code: "NOT_FOUND" },
              });
            }
     
            return dimension;
          }));
              
          const tardis = new TardisModel({camuflaje: tardises.camuflaje, regeneracion: tardises.regeneracion, anoActual: tardises.anoActual, dimensionesID: tardises.dimensiones,});
        
          const newTardis = await tardis.save(); 
  
      return {
        id: newTardis._id.toString(),
        camuflaje: newTardis.camuflaje,
        regeneracion: newTardis.regeneracion,
        anoActual: newTardis.anoActual,
        dimensiones: GrupoDimensiones.map((dimension) => {
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
        }
        ),
      }
    },
      
    
    
    postDimension: async (_parent: unknown, args: { nombre: string, planetasID: string[] }): Promise<DimensionModelType> => {
            const dimensiones = {
                nombre: args.nombre,
                planetas: args.planetasID
            };

            const GrupoPlanetas = await Promise.all(dimensiones.planetas.map(async (planetasID) => {
                const planeta = await PlanetaModel.findById(planetasID).populate({path: "personasID"}).exec();
                if(!planeta){
                    throw new GraphQLError("No se encontró el Planeta", {
                        extensions: { code: "NOT_FOUND" },
                    });
                }
                return planeta;
              }
            ));

            const dimension = new DimensionModel({ nombre: dimensiones.nombre, planetasID: dimensiones.planetas });
            const newDimension = await dimension.save();
            return {
                    id: newDimension._id.toString(),
                    nombre: newDimension.nombre,
                    planetas: GrupoPlanetas.map((planeta) => {
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

    postPlaneta: async (_parent: unknown, args: { nombre: string, personasID: string[] }): Promise<PlanetaModel> => {
        
            const planetas = {
                nombre: args.nombre,
                personas: args.personasID
            
            };

            const grupoPersonas = await Promise.all(planetas.personas.map(async (personasID) => {
                const persona = await PersonaModel.findById(personasID).exec();
                if(!persona){
                    throw new GraphQLError("No se encontró la Persona", {
                        extensions: { code: "NOT_FOUND" },
                    });
                }
                return persona;
              }));

              const planeta = new PlanetaModel({ nombre: planetas.nombre, personasID: planetas.personas });
              const newPlaneta = await planeta.save();
            return {
                    id: newPlaneta._id.toString(),
                    nombre: newPlaneta.nombre,
                    personas: grupoPersonas.map((persona) => {
                        return {
                            id: persona.id.toString(),
                            nombre: persona.nombre,
                        };
                    }),
                  };

                
        
    },

    
    postPersona: async (_parent: unknown, args: { nombre: string }): Promise<PersonaModelType> => {
        try{
            const persona = {
                nombre: args.nombre
            };
            const newPersona = await PersonaModel.create(persona);
            return{
                id: newPersona._id.toString(),
                nombre: newPersona.nombre,
            }
        }catch(err){
            throw new GraphQLError(err.message);
        }
    },

};