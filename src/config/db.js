import mongoose from 'mongoose';
import constants from './constants';
import Promise from 'promise';

mongoose.Promise = Promise;

const USER = encodeURIComponent(constants.USER);
const PASS = encodeURIComponent(constants.PASS);
const URI = `mongodb://${USER}:${PASS}@${constants.DB_URL}`;

mongoose
  .connect(
    URI,
    {
      socketTimeoutMS: 10000,
      keepAlive: true
    }
  )
  .then(
    () => {
      console.log('connection db ready to use.');
      if (cb) cb(null, 'success');
    },
    err => {
      console.log('connection error - ', err);
      if (cb) cb(err);
    }
  );
