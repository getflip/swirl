import dotenv from "dotenv";
import { sendDataToAlgolia } from "./AlgoliaDataGenerator";
import AlgoliaDataFactory from "./AlgoliaDataGenerator/AlgoliaDataFactory";

async function generateAlgoliaData() {
  dotenv.config();

  try {
    const algoliaData = AlgoliaDataFactory.generate();
    await sendDataToAlgolia(algoliaData);
  } catch (error) {
    console.error(error);
  }
}

// script execution
generateAlgoliaData();
