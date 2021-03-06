// Model for users

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import UserSeeds from "../helpers/UserSeeds";

let Schema = new mongoose.Schema({
  userName: {type: String },
  firstName: {type: String },
  lastName: {type: String },
  email: {type: String },
  password: {type: String },
  birthDate: {type: Date },
  location: {type: String },      // address
  phoneNumber: {type: String },
  description: { type: String },  // description of habits
  image: { type: String },        // image of himself
});

let Model = mongoose.model('User', Schema);
//let UserModel = mongoose.model('User', Schema);

export default {
  // utile ?
  seedUser: () => {
    let promises = [];
    for (let user of UserSeeds){
      promises[promises.length] = Model.create(user);
    }
    return Promise.all(promises);
  },

  getUsers: () => {
    return Model.find({}).exec();
  },

  getUser: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createUser: (user) => {
    return Model.create({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      location: user.location,
      phoneNumber: user.phoneNumber,
      description: user.description, 
      image: user.image,
    });
  },

  updateUser: (_id, user) => {
    return Model.findOneAndUpdate({ _id }, {      
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      location: user.location,
      phoneNumber: user.phoneNumber,
      description: user.description,
      image: user.image,
    }, {upsert: true}).exec();
  },

  deleteUser: () => {
    return Model.remove({}).exec();
  },

  deleteUser: (_id) => {
    return Model.remove({ _id }).exec();
  },
};
