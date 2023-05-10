package com.example;

import com.google.gson.Gson;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka010.ConsumerStrategies;
import org.apache.spark.streaming.kafka010.KafkaUtils;
import org.apache.spark.streaming.kafka010.LocationStrategies;
import org.json.JSONObject;

public class DataProcessor {

    public static void main(String[] args) throws InterruptedException {
        SparkConf conf = new SparkConf().setAppName("RichestPeopleProcessor").setMaster("local[*]");

        JavaStreamingContext jssc = new JavaStreamingContext(conf, new Duration(5000));

        // Configure Kafka
        Map<String, Object> kafkaParams = new HashMap<>();
        kafkaParams.put("bootstrap.servers", "localhost:9092");
        kafkaParams.put("key.deserializer", StringDeserializer.class);
        kafkaParams.put("value.deserializer", StringDeserializer.class);
        kafkaParams.put("group.id", "rich_people_processor");
        kafkaParams.put("auto.offset.reset", "latest");
        kafkaParams.put("enable.auto.commit", false);

        // Subscribe to the Kafka topic
        Collection<String> topics = Arrays.asList("rich_people_topic");
        JavaDStream<ConsumerRecord<String, String>> stream = KafkaUtils.createDirectStream(
            jssc,
            LocationStrategies.PreferConsistent(),
            ConsumerStrategies.Subscribe(topics, kafkaParams)
        );

        // Process the data
        JavaDStream<String> richPeopleData = stream.map(record -> {
            // Deserialize JSON data
            Gson gson = new Gson();
            return gson.fromJson(record.value(), String.class);
        });

        richPeopleData.foreachRDD((JavaRDD<String> rdd) -> {
            // Append data to the CSV file
            String csvFile = args[0];
            // Write the data
            List<String> data = rdd.collect();
            System.out.println(data);
            for (String row : data) {
                try (BufferedWriter bw = new BufferedWriter(new FileWriter(csvFile, true))) {
                    JSONObject jsonObject = new JSONObject(row);
                    bw.write(
                        jsonObject.getInt("rank") +
                        "," +
                        jsonObject.getString("personName") +
                        "," +
                        jsonObject.getInt("age") +
                        "," +
                        jsonObject.getInt("finalWorth") +
                        "," +
                        jsonObject.getString("category") +
                        "," +
                        jsonObject.getString("source") +
                        "," +
                        jsonObject.getString("country") +
                        "," +
                        jsonObject.getString("state") +
                        "," +
                        jsonObject.getString("city") +
                        "," +
                        jsonObject.getString("organization") +
                        "," +
                        jsonObject.getBoolean("selfMade") +
                        "," +
                        jsonObject.getString("gender") +
                        "," +
                        jsonObject.getString("birthDate") +
                        "," +
                        jsonObject.getString("title") +
                        "," +
                        jsonObject.getInt("philanthropyScore") +
                        "," +
                        jsonObject.getString("bio") +
                        "," +
                        jsonObject.getString("about") +
                        ","
                    );
                    bw.newLine();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        // Start the Spark Streaming context and await termination
        jssc.start();
        jssc.awaitTermination();
    }
}
