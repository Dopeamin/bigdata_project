package com.example;

import com.google.gson.Gson;
import java.util.*;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaPairDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka010.ConsumerStrategies;
import org.apache.spark.streaming.kafka010.KafkaUtils;
import org.apache.spark.streaming.kafka010.LocationStrategies;
import scala.Tuple2;

public class DataProcessor {

    public static void main(String[] args) throws InterruptedException {
        // Configure Spark
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
        JavaDStream<RichPersonData> richPeopleData = stream.map(record -> {
            // Deserialize JSON data
            Gson gson = new Gson();
            return gson.fromJson(record.value(), RichPersonData.class);
        });

        // Aggregate data by country
        JavaPairDStream<String, Tuple2<Integer, Integer>> aggregatedData = richPeopleData
            .mapToPair(
                (PairFunction<RichPersonData, String, Tuple2<Integer, Integer>>) richPersonData ->
                    new Tuple2<>(
                        richPersonData.getCountry(),
                        new Tuple2<>(1, richPersonData.getCharacteristics().length())
                    )
            )
            .reduceByKey(
                (Function2<Tuple2<Integer, Integer>, Tuple2<Integer, Integer>, Tuple2<Integer, Integer>>) (
                        tuple1,
                        tuple2
                    ) ->
                    new Tuple2<>(tuple1._1() + tuple2._1(), tuple1._2() + tuple2._2())
            );

        // Print the aggregated data
        aggregatedData.print();

        // Start the Spark Streaming context and await termination
        jssc.start();
        jssc.awaitTermination();
    }

    public static class RichPersonData {

        private String country;
        private String name;
        private String characteristics;

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getCharacteristics() {
            return characteristics;
        }

        public void setCharacteristics(String characteristics) {
            this.characteristics = characteristics;
        }
    }
}
