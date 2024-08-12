import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import * as fs from 'fs';
import * as path from 'path';

const PINECONE_API_KEY = process.env.PINECONE_API_KEY!;
const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT!;
const PINECONE_INDEX = process.env.PINECONE_INDEX!;

async function embedDocuments() {
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: PINECONE_API_KEY,
    environment: PINECONE_ENVIRONMENT,
  });

  const index = pinecone.Index(PINECONE_INDEX);

  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex: index });

  const documentsDir = path.join(process.cwd(), 'documents');
  const files = fs.readdirSync(documentsDir);

  for (const file of files) {
    const content = fs.readFileSync(path.join(documentsDir, file), 'utf-8');
    const doc = new Document({
      pageContent: content,
      metadata: { source: file },
    });

    await vectorStore.addDocuments([doc]);
    console.log(`Embedded and stored ${file}`);
  }

  console.log('All documents have been processed and stored in Pinecone.');
}

embedDocuments().catch(console.error);