import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import infrastructure.CSVUtility;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import org.bson.Document;

public class Main {

  public static void main(String[] args) throws Exception {
    String csvFile = args[0];
    List<String[]> data = CSVUtility.readCSV(csvFile);

    // Get most common values in general
    Map<String, List<Entry<String, Integer>>> mostCommonValues = CSVUtility.getMostCommonValues(
      data
    );

    // Get most common values by country
    Map<String, Map<String, String>> mostCommonValuesByCountry = CSVUtility.getMostCommonValuesByCountry(
      data
    );

    // Connect to MongoDB
    String connectionString =
      "mongodb+srv://dalideco:Pcqq0HU4dTCUSSt3@bigdata.pod5mkc.mongodb.net/?retryWrites=true&w=majority";
    MongoClientSettings settings = MongoClientSettings
      .builder()
      .applyConnectionString(new ConnectionString(connectionString))
      .build();
    MongoClient mongoClient = MongoClients.create(settings);
    MongoDatabase database = mongoClient.getDatabase("bigdata");

    // Insert general most common values data into MongoDB
    MongoCollection<Document> generalCollection = database.getCollection(
      "common_values"
    );
    generalCollection.drop();
    database.createCollection("common_values");
    generalCollection = database.getCollection("common_values");
    Document generalData = new Document();
    for (String field : mostCommonValues.keySet()) {
      List<Entry<String, Integer>> values = mostCommonValues.get(field);
      generalData.put(
        field,
        values
          .stream()
          .map(entry ->
            new Document("value", entry.getKey())
              .append("count", entry.getValue())
          )
          .collect(Collectors.toList())
      );
    }
    generalCollection.insertOne(generalData);
    // Insert most common values by country data into MongoDB
    MongoCollection<Document> collection = database.getCollection(
      "common_values_by_country"
    );
    collection.drop();
    database.createCollection("common_values_by_country");
    collection = database.getCollection("common_values_by_country");

    for (String country : mostCommonValuesByCountry.keySet()) {
      Document countryData = new Document("type", "country")
        .append("country", country);
      Map<String, String> fields = mostCommonValuesByCountry.get(country);
      for (String field : fields.keySet()) {
        countryData.put(field, fields.get(field));
      }
      collection.insertOne(countryData);
    }

    // Store all data
    MongoCollection<Document> allDataCollection = database.getCollection(
      "all_data"
    );
    allDataCollection.drop();
    database.createCollection("all_data");
    allDataCollection = database.getCollection("all_data");

    List<Document> allDataDocuments = CSVUtility.storeAllData(data);
    allDataCollection.insertMany(allDataDocuments);
    mongoClient.close();
  }
}
