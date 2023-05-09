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
        SparkConf conf = new SparkConf()
            .setAppName("RichestPeopleProcessor")
            .setMaster("local[*]")
            .set(
                "spark.mongodb.output.uri",
                "mongodb+srv://dalideco:Pcqq0HU4dTCUSSt3@bigdata.pod5mkc.mongodb.net/bigdata.common_values"
            )
            .set(
                "spark.mongodb.output.uri",
                "mongodb+srv://dalideco:Pcqq0HU4dTCUSSt3@bigdata.pod5mkc.mongodb.net/bigdata.common_values_by_country"
            );

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
        JavaDStream<String[]> richPeopleData = stream.map(record -> {
            // Deserialize JSON data
            Gson gson = new Gson();
            return gson.fromJson(record.value(), String[].class);
        });

        // Store data in MongoDB
        richPeopleData.foreachRDD((JavaRDD<String[]> rdd) -> {
            JavaRDD<Document> documentRDD = rdd.map(
                (Function<String[], Document>) data -> {
                    Document doc = new Document();
                    for (int i = 0; i < CSVUtility.HEADERS.length; i++) {
                        doc.append(CSVUtility.HEADERS[i], data[i]);
                    }
                    return doc;
                }
            );

            // Store data in the general_filtered_data collection
            MongoSpark.save(documentRDD);

            // Store data in the country_filtered_data collection
            Map<String, String> writeOverrides = new HashMap<>();
            writeOverrides.put("collection", "common_values");
            WriteConfig countryWriteConfig = WriteConfig.create(conf).withOptions(writeOverrides);
            MongoSpark.save(documentRDD, countryWriteConfig);
        });

        // Start the Spark Streaming context and await termination
        jssc.start();
        jssc.awaitTermination();
    }

    public class RichPerson {

        private Integer rank;
        private String personName;
        private Integer age;
        private Double finalWorth;
        private String category;
        private String source;
        private String country;
        private String state;
        private String city;
        private String organization;
        private String selfMade;
        private String gender;
        private String birthDate;
        private String title;
        private Integer philanthropyScore;
        private String bio;
        private String about;

        // Constructors, getters, and setters

        public RichPerson() {}

        // Add other constructors if needed

        public Integer getRank() {
            return rank;
        }

        public void setRank(Integer rank) {
            this.rank = rank;
        }

        public String getPersonName() {
            return personName;
        }

        public void setPersonName(String personName) {
            this.personName = personName;
        }

        public Integer getAge() {
            return age;
        }

        public void setAge(Integer age) {
            this.age = age;
        }

        public Double getFinalWorth() {
            return finalWorth;
        }

        public void setFinalWorth(Double finalWorth) {
            this.finalWorth = finalWorth;
        }
        // Add the remaining getters and setters for the other fields
    }
}
