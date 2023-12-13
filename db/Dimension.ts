import mongoose from "mongoose";
import { Dimension } from "../types.ts";

const Schema = mongoose.Schema;

const DimensionSchema = new Schema(
    {
    nombre: { type: String, required: true },
    planetasID: [{ type: Schema.Types.ObjectId, ref: "planetas" , required: true}]

    },
 );

export type DimensionModelType = mongoose.Document & Omit<Dimension, "id">;

DimensionSchema.path("planetasID").validate(async function (value: mongoose.Types.ObjectId) {
    if(value == this.planetasID){
        return true;
    }
    const planeta = await mongoose.models.Planeta.findById(value);
    if(!planeta){
        throw new Error("El planeta no existe");
    }
    return true;
}
);



export const DimensionModel = mongoose.model<DimensionModelType>("dimensiones", DimensionSchema);