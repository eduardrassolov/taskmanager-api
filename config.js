const port = 3001;

const URL_DB =
  "mongodb+srv://test:6YiXhAd3klJjYBtk@cluster0.1nlrtuh.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "task_manager";

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: DB_NAME,
};

exports.port = port;
exports.OPTIONS = OPTIONS;
exports.URL_DB = URL_DB;
exports.DB_NAME = DB_NAME;
