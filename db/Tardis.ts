import mongoose from "mongoose";
import { Tardis } from "../types.ts";

const Schema = mongoose.Schema;

const TardisSchema = new Schema({
    camuflaje: { type: String, required: true },
    regeneracion: { type: Number, required: true },
    anoActual: { type: Number, required: true },
    dimensionesID: [{ type: Schema.Types.ObjectId, required: true, ref: "dimensiones" }]
  });

export type TardisModelType = mongoose.Document & Omit<Tardis, "id">;


TardisSchema.path("dimensionesID").validate(async function (value: mongoose.Types.ObjectId) {
    if(value == this.dimensionesID){
        return true;
    }
    const dimension = await mongoose.models.Dimension.findById(value);
    if(!dimension){
        throw new Error("La dimension no existe");
    }
    return true;
}
);


export const TardisModel = mongoose.model<TardisModelType>("Tardis", TardisSchema);