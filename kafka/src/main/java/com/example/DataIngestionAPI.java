package com.example;

import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.util.Properties;
import java.util.concurrent.Executors;
import java.io.ByteArrayOutputStream;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;

public class DataIngestionAPI {

    private static Producer<String, String> producer;

    public static void main(String[] args) throws Exception {
        // Set up Kafka producer
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        producer = new KafkaProducer<>(props);

        // Set up HTTP server
        HttpServer server = HttpServer.create(new InetSocketAddress(3002), 0);
        server.createContext("/ingest", new DataIngestionHandler());
        server.setExecutor(Executors.newFixedThreadPool(8));
        server.start();
    }

    static class DataIngestionHandler implements HttpHandler {

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Get the data from the request body
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int length;
            InputStream inputStream = exchange.getRequestBody();
            while ((length = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, length);
            }
            String data = outputStream.toString("UTF-8");

            // Publish to Kafka
            ProducerRecord<String, String> record = new ProducerRecord<>("rich_people_topic", null, data);
            producer.send(record);

            // Send a response
            String response = "Data received and sent to Kafka";
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}
