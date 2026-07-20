import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    default: { ops: [] },
  },
})

const Document = mongoose.model('document', documentSchema)
export default Document
