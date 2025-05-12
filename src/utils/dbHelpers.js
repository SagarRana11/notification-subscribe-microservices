const getRespectiveModel = (db, collectionName) => {
    return db.collection(collectionName);
  };
  module.exports = { getRespectiveModel };