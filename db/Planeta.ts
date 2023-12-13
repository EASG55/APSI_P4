import mongoose from "mongoose";
import { Planeta } from "../types.ts";

const Schema = mongoose.Schema;

const PlanetaSchema = new Schema(
    {
    nombre: { type: String, required: true },
    personasID: [{ type: Schema.Types.ObjectId, ref: "personas" , required: true}],

    },
 );

 export type PlanetaModelType = mongoose.Document & Omit<Planeta, "id">;

 PlanetaSchema.path("personasID").validate(async function (value: mongoose.Types.ObjectId) {
    if(value == this.personasID){
        return true;
    }
    const persona = await mongoose.models.Persona.findById(value);
    if(!persona){
        throw new Error("La persona no existe");
    }
    return true;
});


 export const PlanetaModel = mongoose.model<PlanetaModelType>("planetas", PlanetaSchema);