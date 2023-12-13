import mongoose from "mongoose";
import { Persona } from "../types.ts";

const Schema = mongoose.Schema;

const PersonaSchema = new Schema(
    {
    nombre: { type: String, required: true },
    },
 );


export type PersonaModelType = mongoose.Document & Omit<Persona, "id">;


export const PersonaModel = mongoose.model<PersonaModelType>("personas", PersonaSchema);