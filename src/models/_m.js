import mongoose from 'mongoose';

// For the $pushAll issue(mongo 3.6)
mongoose.plugin(schema => {
  schema.options.usePushEach = true;
  schema.options.timestamps = {};
});

require('./user');

export default function _m(model) {
  return mongoose.model(model);
}
