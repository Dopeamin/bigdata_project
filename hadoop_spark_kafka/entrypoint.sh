#!/bin/bash

# Start Hadoop services
$HADOOP_HOME/sbin/start-dfs.sh
$HADOOP_HOME/sbin/start-yarn.sh

# Start Spark services
$SPARK_HOME/sbin/start-master.sh
$SPARK_HOME/sbin/start-worker.sh --webui-port 8081 spark://localhost:7077

# Start Kafka services
$KAFKA_HOME/bin/zookeeper-server-start.sh -daemon $KAFKA_HOME/config/zookeeper.properties
$KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties

# Keep the container running
tail -f /dev/null
