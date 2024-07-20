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

In this project, we used Matryoshka Representation Learning embeddings for efficient multi-query retrieval. The embeddings are generated using `text-embedding-3-small` and `text-embedding-3-large` models and stored in the Qdrant vector database. This approach allows for scalable and accurate retrieval of relevant information from large datasets.

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
1.Create a .env file and create a variable ```OPENAI_API_KEY``` storing your API key.


2.Download the dataset for this project [here](https://run.unl.pt/bitstream/10362/135618/1/TEGI0570.pdf) or you can try with your own dataset. Just change the path of the PDF here.

```sh
    loaders = [
    PyPDFLoader("/content/TEGI0570.pdf"),
    ]
```


3.Execute the ```main.py``` file by running this command in terminal.

```sh
    python main.py
```


## Contact

For any questions or issues, feel free to open an issue on this repository or contact me at vanshkhaneja2004@gmail.com.

Happy coding!
