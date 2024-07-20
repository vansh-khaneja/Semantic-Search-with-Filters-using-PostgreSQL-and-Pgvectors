# Semantic Search with filters using Pgvectors and Javascript
This project will guide you through  building a data retireval model by semantic search and filtering with metadata using the [Timescale](https://console.cloud.timescale.com/) hosted potgreSQL database. This filtering and then perfomring sematic search techniques makes the model both fast and effeicient. To learn more about the project please refer this [article](link).

![Alt Text - description of the image](https://github.com/vansh-khaneja/Multi-Stage-Queries-with-MRL/blob/main/image/img1.png)


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Execution](#execution)
- [Contact](#contact)

## Introduction

In this project we have performed semantic search along with metadata filtering over the timescale hosted PostgreSQL using the concept of Pgvectors with Javascript. This makes the retrieval process fast, efficient and more refined due to two stage filtering of data. This model can be used to enhence the spped and user experience for different RAG Applications and chatbots.

## Features

- Efficient and Accurate 
- Two stage filtering for refined results
- Scalable and high-performance retrieval system
- Fast Results

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/vansh-khaneja/Semantic-Search-with-Filters-using-PostgreSQL-and-Pgvectors
    cd Semantic-Search-with-Filters-using-PostgreSQL-and-Pgvectors
    ```

2. Download Node.js and install these npm packages:

    ```sh
    npm install pg
    npm install @xenova/transformers
    npm install ndarray
    npm install csv-parser

    ```

3. Set up Database:

    Follow this link to create a service on [Timescale](https://qdrant.tech/documentation/) to setup PostgreSQL database.

## Execution
1.Once the database is setup copy the credentials ```user```, ```host```, ```password```, ```database``` and ```port```.

2.Now replace these credentials in the following code snippet in ```fetch_data.js``` and ```load_data.js```.
```sh
const client = new Client({
        user: 'USER',
    host: 'HOST',
    password:'PASSWORD',
    database: 'DATABASE',
    port: PORT,
  });

```
3.Download the Kaggle dataset from [here](https://www.kaggle.com/datasets/vanshkhaneja/it-queries-data) which contains some technical queries and their resoltion along with metadata.

4.Execute the ```load_data.js``` file by running this command in terminal.

```sh
    node load_data.js
```
This will upload the data into the database along with the vector embeddings.

5.At last execute ```fetch_data.js``` file by running this command.

```sh
    node load_data.js
```
This will fetch the data based on the question in this code snippet present in ```fetch_data.js```.

```sh
    var question = "My computer is overheating";
    var filters = {
      issue:"freezing",
      os:"windows",
    }
    
    
    await fetch_query(question,filters.issue,filters.os)
```


## Contact

For any questions or issues, feel free to open an issue on this repository or contact me at vanshkhaneja2004@gmail.com.

Happy coding!
