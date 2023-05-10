# Use a base image with Hadoop, Spark, and Kafka preinstalled or install them in a base image (e.g., Ubuntu)
FROM ubuntu:20.04

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk wget curl vim iproute2

# Set environment variables
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV HADOOP_VERSION 2.10.1
ENV SPARK_VERSION 3.1.2
ENV KAFKA_VERSION 2.8.0
ENV SCALA_VERSION 2.13

# Install Hadoop
RUN wget https://archive.apache.org/dist/hadoop/core/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz && \
    tar -xzf hadoop-${HADOOP_VERSION}.tar.gz && \
    mv hadoop-${HADOOP_VERSION} /usr/local/hadoop && \
    rm hadoop-${HADOOP_VERSION}.tar.gz

# Install Spark
RUN wget https://archive.apache.org/dist/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}-bin-hadoop2.7.tgz && \
    tar -xzf spark-${SPARK_VERSION}-bin-hadoop2.7.tgz && \
    mv spark-${SPARK_VERSION}-bin-hadoop2.7 /usr/local/spark && \
    rm spark-${SPARK_VERSION}-bin-hadoop2.7.tgz

# Install Kafka
RUN wget https://archive.apache.org/dist/kafka/${KAFKA_VERSION}/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz && \
    tar -xzf kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz && \
    mv kafka_${SCALA_VERSION}-${KAFKA_VERSION} /usr/local/kafka && \
    rm kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz

# Set environment variables
ENV HADOOP_HOME /usr/local/hadoop
ENV SPARK_HOME /usr/local/spark
ENV KAFKA_HOME /usr/local/kafka
ENV PATH $PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$SPARK_HOME/bin:$SPARK_HOME/sbin:$KAFKA_HOME/bin

# Expose necessary ports
EXPOSE 50070 8088 9000 9092 2181 4040 7077 3002
