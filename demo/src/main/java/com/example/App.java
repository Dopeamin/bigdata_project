package com.example;

import org.apache.spark.SparkConf;
import org.apache.spark.streaming.Duration;
// import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;

public class App {

    public static void main(String[] args) throws Exception {
        // Create a SparkConf object with the application name
        SparkConf conf = new SparkConf().setAppName("SparkStreamingExample");

        // Create a JavaStreamingContext with a batch interval of 5 seconds
        JavaStreamingContext ssc = new JavaStreamingContext(conf, new Duration(5000));

        // Create a JavaInputDStream that reads data from a socket
        JavaInputDStream<String> lines = ssc.socketTextStream("localhost", 3000);

        // Append each batch of data to a file
        lines.foreachRDD(rdd -> {
            // TODO: replace by creating appending to existing file
            rdd.saveAsTextFile("/spark-files/" + System.currentTimeMillis());

            // Trigger the Hadoop jar executable
            ProcessBuilder pb = new ProcessBuilder("hadoop", "jar", "input/input.csv");
            pb.start();
        });

        // Start the streaming context
        ssc.start();
        ssc.awaitTermination();
        ssc.close();
    }
}