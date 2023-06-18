const mongoose = require('mongoose');
const likeSchema = new  mongoose.Schema({
    user: {
        // Is the object post or comment
        type: mongoose.Schema.ObjectId
    },
    // this defines the objectId of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        // Telling that it is dynamicalley refrenced
        refPath: 'onModel'
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;