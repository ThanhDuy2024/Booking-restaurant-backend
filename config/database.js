import mongoose from 'mongoose';

export const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log("Database is not connected");
  }
}