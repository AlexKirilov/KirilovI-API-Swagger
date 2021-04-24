import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    siteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers' },

    // WebSite types
    // Q: Is this going to create records in each of those tables?
    // productID: { type: mongoose.Schema.Types.ObjectId, ref: ['Products', 'Properties'] },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },

    clientName: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    vote: { type: Number, default: 0 },
    comment: { type: String, default: '' },

    created: { type: Date, default: new Date().toISOString() },
    edit: { type: Date, default: new Date().toISOString() }
});

module.exports = mongoose.model('Comments', commentsSchema);

// SchemaType.prototype.ref()
// Parameters
// ref «String|Model|Function» either a model name, a Model, or a function that returns a model name or model.
// Returns:
// «SchemaType» this
// Set the model that this path refers to. This is the option that populate looks at to determine the foreign collection it should query.

// Example:
// const userSchema = new Schema({ name: String });
// const User = mongoose.model('User', userSchema);

// const postSchema = new Schema({ user: mongoose.ObjectId });
// postSchema.path('user').ref('User'); // Can set ref to a model name
// postSchema.path('user').ref(User); // Or a model class
// postSchema.path('user').ref(() => 'User'); // Or a function that returns the model name
// postSchema.path('user').ref(() => User); // Or a function that returns the model class

// // Or you can just declare the `ref` inline in your schema
// const postSchema2 = new Schema({
//   user: { type: mongoose.ObjectId, ref: User }
// });