import fs from 'fs';
import { parse } from 'csv-parse';

import {pipeline} from '@xenova/transformers'
import ndarray from 'ndarray';

import pkg from 'pg';


const { Client } = pkg;

let allRows = [], question = [], answer = [], issue = [], os = [];







async function loadModel(){
  const extractor = await pipeline(
      'feature-extraction',
      'Xenova/bge-small-en-v1.5'
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




function processCSV() {
new Promise((resolve, reject) => {
    fs.createReadStream("./data.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        allRows.push(row); // Store each row in the global array
      })
      .on("end", function () {
        console.log("CSV file successfully processed");
    
        question = allRows.map(r => r[0]);
        answer = allRows.map(r => r[1]);
        issue = allRows.map(r => r[2]);
        os = allRows.map(r => r[3]);
        
        resolve();
      })
      .on("error", function (error) {
        console.error(error);
        reject(error);
      });
  });
}



  await processCSV();
  

  let emb_list = []
  for(let i=0;i<question.length;i++){

    let embedding = await get_emb(question[i]);
    let embeddingArray = ndarray(embedding.data, [embedding.data.length]);
    emb_list.push(`[${embeddingArray['data']}]`)

    
  }


  const client = new Client({
    user: "USER",
    host: "HOST",
    password: "PASSWORD",
    database: "DATABASE",
    port: PORT,
  });
  
  
  client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

    const table_create_command = "CREATE TABLE embedding_db (id bigserial primary key,question text, answer text,issue text,os text,embeddings vector(384));"
    client.query(table_create_command, (err, res) => {
      if (err) {
        console.error(err.stack);
      } else {
        console.log('TABLE CREATED');
      }
    });
    
  
    let valueLists = [];
    for (let i = 0; i < question.length; i++) {
      valueLists.push([i+2500,question[i], answer[i], issue[i], os[i], emb_list[i]]);
    }
    const columnCount = valueLists[0].length;
    
    const placeholders = valueLists.map((_, rowIndex) => {
      const start = rowIndex * columnCount + 1;
      const placeholderString = Array.from({ length: columnCount }, (_, i) => `$${start + i}`).join(', ');
      return `(${placeholderString})`;
    }).join(', ');


    const text = `INSERT INTO embedding_db VALUES ${placeholders}`;
    const values = valueLists.flat();



client.query(text, values, (err, res) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log('Inserted successfully:', res.rowCount);
  }
  client.end();
});




