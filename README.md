# Big Data Pipeline For Forbes Billionaires

- This is a pipeline that uses many Big Data technologies to process the richest people of the world and sort them by country and get their count by country
- It was made by me and [Mohamed Ali Sahnoun](https://github.com/dalideco) and [Motez Baccouch](https://github.com/motez-baccouch).

## Data
- We took the date  from [Kaggle](https://www.kaggle.com/datasets/shrikrishnaparab/forbes-billionaires-and-companies-2022?resource=download)
- Each line a billionaire with his information (country,rank,name...)
- We're interested in grouping the sum of billionaires per country and ranking them according to country.

## Architecture
![Forbes billionaires 2022 csv files](https://user-images.githubusercontent.com/30242595/228058981-51c65788-b08f-4e7f-9e00-8150a1087633.jpg)

### 1. Data Ingestion:
The data is first ingested into the Hadoop cluster using Hadoop's built-in File System API or Hadoop's command-line interface. The data is then stored in HDFS.

### 2. Data Processing:
Hadoop is used for distributed processing and storage of large data sets. In this pipeline, Hadoop MapReduce is used to read the data from HDFS, sort the data by field, and write the sorted data to MongoDB.

### 3. Data Analysis:
Spark is used for data processing and analytics. Spark is used to read the sorted data from MongoDB, count the number of occurrences of each field, and write the output to MongoDB.

### 4. Data Visualization:
NextJs is used to create a web interface that interacts with MongoDB to display the output of the Spark job. Django can be used to develop the backend of the web interface to interact with MongoDB and perform other tasks.
