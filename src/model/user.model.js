const getUserModel = (db) => {
  return db.collection("User");
};
module.exports = { getUserModel };
