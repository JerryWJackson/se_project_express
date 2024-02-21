require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "this-is-indeed-an-unwieldy-and-unnecessarily-long-secret-phrase-but-may-be-difficuly-at-best-to-guess";

module.exports = { JWT_SECRET };