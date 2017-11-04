// Model for pets

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import PetSeeds from "../helpers/PetSeeds";

let Schema = new mongoose.Schema({
  name: { type: String },
  breed: { type: String },
  birthDate: { type: String },
  description: { type: String },
  image: { type: String }
});

let Model = mongoose.model('Pet', Schema);
//let PetModel = mongoose.model('Pet', Schema);

export default {
  seedPet: () => {
    let promises = [];
    for (let pet of PetSeeds){
      promises[promises.legth] = Model.create(pet);
    }
    return Promise.all(promises);
  },

  getPets: () => {
    return Model.find({}).exec();
  },

  getPet: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createPet: (pet) => {
    return Model.create({
      name: pet.name,
      breed: pet.breed,
      birthDate: pet.birthDate,
      description: pet.description,
      image: pet.image
    });
  },

  updatePet: (_id, pet) => {
    return Model.findOneAndUpdate({ _id }, {      
      name: pet.name,
      breed: pet.breed,
      birthDate: pet.birthDate,
      description: pet.description,
      image: pet.image
    }, {upsert: true}).exec();
  },

  deletePet: () => {
    return Model.remove({}).exec();
  },

  deletePet: (_id) => {
    return Model.remove({ _id }).exec();
  },
};
