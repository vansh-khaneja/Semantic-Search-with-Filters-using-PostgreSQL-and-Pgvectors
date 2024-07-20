import pkg from "pg";
const { Client } = pkg;

import { pipeline } from "@xenova/transformers";
import ndarray from "ndarray";




async function loadModel() {
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/bge-small-en-v1.5"
  );
  return extractor;
}
async function get_emb(ques){
  const bgeModel =  await loadModel();
  const queryEmbedding = await bgeModel(ques,{
    pooling: 'mean',
    normalize: true,
   })
   
   return queryEmbedding;
}



const client = new Client({
  user: "USER",
  host: "HOST",
  password: "PASSWORD",
  database: "DATABASE",
  port: PORT,
});
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));




async function fetch_query(question,issue,os){
  var queryEmbedding1 = await get_emb(question);
  var embeddingArray1 = ndarray(queryEmbedding1.data, [
    queryEmbedding1.data.length,
  ]);
  client.query(
    `SELECT answer FROM embedding_db WHERE os='${os}' and issue='${issue}' ORDER BY embeddings <=> '[${embeddingArray1["data"]}]' LIMIT 3`
  )
  .then(async (res) => {
    console.log("Query result:", res.rows);
    
  })
  .catch((err) => {
    console.error("Query error", err.stack);
  }) 
}


var question = "My computer is overheating";
var filters = {
  issue:"freezing",
  os:"windows",
}

await fetch_query(question,filters.issue,filters.os)


