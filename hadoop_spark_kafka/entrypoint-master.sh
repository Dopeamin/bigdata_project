#!/bin/bash

# Update configuration files with slave hostnames
echo -e "$SLAVE_HOSTS" > $HADOOP_HOME/etc/hadoop/slaves

# Start Hadoop services
$HADOOP_HOME/sbin/start-dfs.sh
$HADOOP_HOME/sbin/start-yarn.sh

# Start Spark services
$SPARK_HOME/sbin/start-master.sh
$SPARK_HOME/sbin/start-worker.sh --webui-port 8081 spark://master:7077

# Start Kafka services
$KAFKA_HOME/bin/zookeeper-server-start.sh -daemon $KAFKA_HOME/config/zookeeper.properties
$KAFKA_HOME/bin/kafka-server-start.sh -daemon $KAFKA_HOME/config/server.properties

# Update broker.id and listeners for server-1.properties
echo "broker.id=1" >> $KAFKA_HOME/config/server-1.properties
echo "listeners=PLAINTEXT://:9093" >> $KAFKA_HOME/config/server-1.properties

# Start Kafka broker 2
$KAFKA_HOME/bin/kafka-server-start.sh -daemon $KAFKA_HOME/config/server-1.properties

# Update broker.id and listeners for server-2.properties
echo "broker.id=2" >> $KAFKA_HOME/config/server-2.properties
echo "listeners=PLAINTEXT://:9094" >> $KAFKA_HOME/config/server-2.properties

# Start Kafka broker 3
$KAFKA_HOME/bin/kafka-server-start.sh -daemon $KAFKA_HOME/config/server-2.properties

# Keep the container running
tail -f /dev/null