#!/bin/bash

# Start Hadoop DataNode and NodeManager services
$HADOOP_HOME/sbin/hadoop-daemon.sh start datanode
$HADOOP_HOME/sbin/yarn-daemon.sh start nodemanager

# Keep the container running
tail -f /dev/null
