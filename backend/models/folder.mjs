import {Schema,model} from 'mongoose'


const folderSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    parentFolder: {
      type: Schema.Types.ObjectId,
      ref: 'Folder'
    },
    subfolders: [{
      type: Schema.Types.ObjectId,
      ref: 'Folder'
    }],
    images: [{
      type: Schema.Types.ObjectId,
      ref: 'Image'
    }],
    userId:{
      type: Schema.Types.ObjectId,
      ref: 'users',
     
    }
  });

 export  const Folder = model('Folder', folderSchema);