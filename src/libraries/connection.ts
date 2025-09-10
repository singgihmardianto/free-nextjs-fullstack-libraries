import "reflect-metadata";
import { DataSource } from "typeorm";

// Create a singleton DataSource instance
const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "dbname",
  synchronize: false,
  logging: process.env.APP_ENV?.toLowerCase() === "dev", // enable only on dev
  entities: ["src/libraries/_entites/*.ts"],
  migrations: ["src/libraries/_migrations/*.ts"],
  subscribers: [],
});

let initialized = false;
let initializationPromise: Promise<DataSource> | null = null;

export const getDataSource = async () => {
  if (!initialized) {
    if (!initializationPromise) {
      initializationPromise = AppDataSource.initialize()
        .then(ds => {
          initialized = true;
          return ds;
        })
        .catch(err => {
          console.error("Error during DataSource initialization", err);
          initializationPromise = null;
          throw err;
        });
    }
    return initializationPromise;
  }
  return AppDataSource;
};

// Export the AppDataSource for CLI tools
export default AppDataSource;
