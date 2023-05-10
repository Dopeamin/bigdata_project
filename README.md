# Big Data Pipeline For Forbes Billionaires

- This is a pipeline that uses many Big Data technologies to process the richest people of the world and sort them by country and get their count by country, It also filters their most common attributes in general and also by country
- It was made by [Mohamed Amine Hamdouni](https://github.com/Dopeamin) and [Mohamed Ali Sahnoun](https://github.com/dalideco) and [Motez Baccouch](https://github.com/motez-baccouch).

## Data

- We took the date from [Kaggle](https://www.kaggle.com/datasets/shrikrishnaparab/forbes-billionaires-and-companies-2022?resource=download)
- Each line a billionaire with his information (country,rank,name...)
- We're interested in grouping the sum of billionaires per country and ranking them according to country and specifying their most common attributes.

## Architecture
![Forbes billionaires 2022 csv files (3)](https://github.com/Dopeamin/bigdata_project/assets/30242595/6644c515-8247-4f35-b3e0-ecc90df0e5f1)

## Folder Structure
.
├── backend/ 
├── data-visualization/ (FrontEnd)
├── hadoop_spark_kafka/ (Docker Container files)
├── kafka/
├── spark/
├── project/  (Hadoop java project)
├── README.md

## Screenshots

<img width="1440" alt="Screenshot 2023-05-10 at 23 50 19" src="https://github.com/Dopeamin/bigdata_project/assets/30242595/133d0405-38ff-4399-b373-5e5a7d9bcbdd">

<img width="1438" alt="Screenshot 2023-05-10 at 23 50 29" src="https://github.com/Dopeamin/bigdata_project/assets/30242595/02fb0140-4c13-4aea-a8f3-c5b4af855fd5">


### 1. Data Ingestion:

- The data is first ingested into the Hadoop cluster using Hadoop's built-in File System API or Hadoop's command-line interface. The data is then stored in MongoDb.

- Creates REST API using a java HTTP server. This API should expose an endpoint to accept incoming data from HTTP requests.

- Inside the API endpoint, validate and parse the incoming data, then use a Kafka producer to publish the data to a Kafka topic.

### 2. Data Processing:

- Hadoop is used for distributed processing and storage of large data sets. In this pipeline, Hadoop MapReduce is used to read the data from HDFS, sort the data by field, and write the sorted data to MongoDB (this task is a scheduled task that happens every specific interval).

- We use a Spark Streaming job to subscribe to the Kafka topic and process the data in real-time and add it to our input data so hadoop can process the new data afterwards.

### 3. Data Storage:

- The data processed by both the bash processing of hadoop and spark streaming will be stored on MongoDb database which will make it easy to access on request.

### 4. Data Visualization:

- NextJs is used to create a web interface that interacts with MongoDB to display the output of the Spark job. NestJs can be used to develop the backend of the web interface to interact with MongoDB and perform other tasks.

### Why we use kafka as a middleware between the request and spark :

Using Kafka as middleware between Spark Streaming and the HTTP request has several benefits:

- Decoupling: Kafka allows for decoupling between the HTTP request and the Spark Streaming job, which means that the HTTP server can handle the requests independently without waiting for the Spark Streaming job to complete.

- Scalability: Kafka is highly scalable, which means that it can handle a large number of requests and process them efficiently. This makes it ideal for handling high volume and high velocity data.

- Fault tolerance: Kafka has built-in fault tolerance capabilities that ensure that messages are not lost even if the system fails. This makes it highly reliable for processing data in real-time.

- Real-time processing: Kafka allows for real-time processing of data, which means that data can be processed as soon as it is received. This ensures that the processing is done in near real-time, which is important for applications that require real-time processing.

Overall, using Kafka as middleware between Spark Streaming and the HTTP request helps to improve the reliability, scalability, and efficiency of the system.

## Configuration

### 0. Launching the container:

Run these scripts (3002 will be used to receive http requests) to create the containers:

`docker build`

`docker network create --driver=bridge hadoop`

`docker-compose up` 

### 1. Setting up hadoop:

Then we need to compile the project jar and copy the input files into hadoop to do that :

- Go to project and run :

  `mvn clean compile assembly:single`

- Then copy target/project-1.0.jar into to docker container :

  `docker cp target/project-1.0.jar master:/usr/local/hadoop.jar`

- Now on a new terminal (not the container) copy the data into the container :

  `docker cp src/main/java/data/data.csv hadoop-master:/usr/local/data.csv`

### 2. Setting up kafka:

First on a new terminal we need to create a topic :

`kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic rich_people_topic`

- Go to kafka folder and run :

  `mvn clean compile assembly:single`

- Now we need to copy the compiled jar into the container :

  `docker cp target/http-to-kafka-1.0-jar-with-dependencies.jar hadoop-master:/root/kafka.jar`

### 3. Setting up Spark:

- Go to spark folder and run :

  `mvn clean compile assembly:single`

- Now we need to copy the compiled jar into the container :

  `docker cp target/spark-1.0-jar-with-dependencies.jar hadoop-master:/root/spark.jar`

## Usage (Everything inside of the container)

### 1. Running Hadoop:

- Run the following command and you will see files created in the output folder with the wanted result:

  `hadoop -jar hadoop.jar data.csv`

### 2. Running Kafka:

- Run the following command and kafka will be listening on port 3002 for any requests:

  `hadoop -jar kafka.jar`

### 3. Running Spark:

- Run the following command and kafka will be listening for any new messages on the rich_people_topic:

  `spark-submit --master local --driver-memory 4g --executor-memory 2g --executor-cores 1 spark.jar`

### 4. Next Steps:

- We can use the form we made to send a well formatted request to the 3002 port on endpoint /ingest (http://localhost:3002/ingest) so it triggers the pipeline

- Data will be visualized on our website made in NextJs

### 5. Running NestJs

  `cd backend && yarn start`

### 6. Running NextJs

  `cd data-visaluzation && yarn dev`

- Then open htttp://localhost:3001/ to see the data visualization
