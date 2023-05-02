# Big Data Pipeline For Forbes Billionaires

- This is a pipeline that uses many Big Data technologies to process the richest people of the world and sort them by country and get their count by country
- It was made by [Mohamed Amine Hamdouni](https://github.com/Dopeamin) and [Mohamed Ali Sahnoun](https://github.com/dalideco) and [Motez Baccouch](https://github.com/motez-baccouch).

## Data
- We took the date  from [Kaggle](https://www.kaggle.com/datasets/shrikrishnaparab/forbes-billionaires-and-companies-2022?resource=download)
- Each line a billionaire with his information (country,rank,name...)
- We're interested in grouping the sum of billionaires per country and ranking them according to country.

## Architecture
![Forbes billionaires 2022 csv files](https://i.imgur.com/y15xczk.png)

### 1. Data Ingestion:
- The data is first ingested into the Hadoop cluster using Hadoop's built-in File System API or Hadoop's command-line interface. The data is then stored in HDFS.

- Creates REST API using a java HTTP server. This API should expose an endpoint to accept incoming data from HTTP requests.

- Inside the API endpoint, validate and parse the incoming data, then use a Kafka producer to publish the data to a Kafka topic.

### 2. Data Processing:
- Hadoop is used for distributed processing and storage of large data sets. In this pipeline, Hadoop MapReduce is used to read the data from HDFS, sort the data by field, and write the sorted data to MongoDB.

- We use a Spark Streaming job to subscribe to the Kafka topic and process the data in real-time.

### 3. Data Analysis:
Spark is used for data processing and analytics. Spark is used to read the sorted data from MongoDB, count the number of occurrences of each field, and write the output to MongoDB.

### 4. Data Visualization:
NextJs is used to create a web interface that interacts with MongoDB to display the output of the Spark job. Django can be used to develop the backend of the web interface to interact with MongoDB and perform other tasks.

### Why we use kafka as a middleware between the request and spark :
Using Kafka as middleware between Spark Streaming and the HTTP request has several benefits:

- Decoupling: Kafka allows for decoupling between the HTTP request and the Spark Streaming job, which means that the HTTP server can handle the requests independently without waiting for the Spark Streaming job to complete.

- Scalability: Kafka is highly scalable, which means that it can handle a large number of requests and process them efficiently. This makes it ideal for handling high volume and high velocity data.

- Fault tolerance: Kafka has built-in fault tolerance capabilities that ensure that messages are not lost even if the system fails. This makes it highly reliable for processing data in real-time.

- Real-time processing: Kafka allows for real-time processing of data, which means that data can be processed as soon as it is received. This ensures that the processing is done in near real-time, which is important for applications that require real-time processing.

Overall, using Kafka as middleware between Spark Streaming and the HTTP request helps to improve the reliability, scalability, and efficiency of the system.