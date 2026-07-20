import Document from '../models/document.js';

export const getDocument = async (id) => {
    if (!id) return null;

    let doc = await Document.findById(id);
    if (!doc) {
        doc = await Document.create({ _id: id, content: { ops: [] } });
    }
    return doc;
};

export const updateDocument = async (id, content) => {
    return await Document.findByIdAndUpdate(id, { content }, { upsert: true });
};