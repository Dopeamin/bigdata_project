package infrastructure;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import utils.FileHandler;

public class CSVUtility {

  public static final int COUNTRY_INDEX = 6;
  public static final String[] HEADERS = {
    "rank",
    "personName",
    "age",
    "finalWorth",
    "category",
    "source",
    "country",
    "state",
    "city",
    "organization",
    "selfMade",
    "gender",
    "birthDate",
    "title",
    "philanthropyScore",
    "bio",
    "about",
  };

  public static List<String[]> readCSV(String filePath)
    throws IOException, CsvException {
    CSVReader reader = new CSVReader(new FileReader(filePath));
    List<String[]> data = reader.readAll();
    reader.close();

    return data;
  }

  public static Map<String, List<Map.Entry<String, Integer>>> getMostCommonValues(
    List<String[]> data
  ) {
    Map<String, Map<String, Integer>> dataByField = groupDataByField(data);
    Map<String, List<Map.Entry<String, Integer>>> mostCommonValues = new HashMap<>();

    for (String field : dataByField.keySet()) {
      Map<String, Integer> valueCounts = dataByField.get(field);
      if (!valueCounts.isEmpty()) {
        List<Map.Entry<String, Integer>> sortedValueCounts = getSortedEntries(
          valueCounts
        );
        mostCommonValues.put(
          field,
          sortedValueCounts.subList(0, Math.min(10, sortedValueCounts.size()))
        );
      }
    }

    return mostCommonValues;
  }

  public static Map<String, Map<String, String>> getMostCommonValuesByCountry(
    List<String[]> data
  ) {
    Map<String, Map<String, Map<String, Integer>>> dataByCountryAndField = groupDataByCountryAndField(
      data
    );
    Map<String, Map<String, String>> mostCommonValuesByCountry = new HashMap<>();

    for (String country : dataByCountryAndField.keySet()) {
      mostCommonValuesByCountry.put(country, new HashMap<>());
      Map<String, Map<String, Integer>> dataByField = dataByCountryAndField.get(
        country
      );
      for (String field : dataByField.keySet()) {
        Map<String, Integer> valueCounts = dataByField.get(field);
        if (!valueCounts.isEmpty()) {
          String mostCommonValue = "";
          int mostCommonValueCount = 0;
          for (Map.Entry<String, Integer> entry : valueCounts.entrySet()) {
            String value = entry.getKey();
            int count = entry.getValue();
            if (count > mostCommonValueCount) {
              mostCommonValue = value;
              mostCommonValueCount = count;
            }
          }
          mostCommonValuesByCountry.get(country).put(field, mostCommonValue);
        }
      }
    }
    return mostCommonValuesByCountry;
  }

  public static Map<String, Map<String, Integer>> groupDataByField(
    List<String[]> data
  ) {
    Map<String, Map<String, Integer>> dataByField = new HashMap<>();
    for (String[] row : data) {
      for (int i = 2; i < HEADERS.length - 2; i++) {
        String field = HEADERS[i];
        String value = row[i];
        if (!dataByField.containsKey(field)) {
          dataByField.put(field, new HashMap<>());
        }
        if (!value.isEmpty()) {
          Map<String, Integer> valueCounts = dataByField.get(field);
          valueCounts.put(value, valueCounts.getOrDefault(value, 0) + 1);
        }
      }
    }
    return dataByField;
  }

  public static Map<String, Map<String, Map<String, Integer>>> groupDataByCountryAndField(
    List<String[]> data
  ) {
    Map<String, Map<String, Map<String, Integer>>> dataByCountryAndField = new HashMap<>();
    for (String[] row : data) {
      String country = row[COUNTRY_INDEX];
      if (!dataByCountryAndField.containsKey(country)) {
        dataByCountryAndField.put(country, new HashMap<>());
      }
      Map<String, Map<String, Integer>> dataByField = dataByCountryAndField.get(
        country
      );
      for (int i = 2; i < HEADERS.length - 2; i++) {
        if (i != COUNTRY_INDEX) {
          System.out.println("header " + HEADERS[i] + i);
          String field = HEADERS[i];
          String value = row[i];
          if (!dataByField.containsKey(field)) {
            dataByField.put(field, new HashMap<>());
          }
          if (!value.isEmpty()) {
            Map<String, Integer> valueCounts = dataByField.get(field);
            valueCounts.put(value, valueCounts.getOrDefault(value, 0) + 1);
          }
        }
      }
    }
    return dataByCountryAndField;
  }

  public static List<Map.Entry<String, Integer>> getSortedEntries(
    Map<String, Integer> map
  ) {
    List<Map.Entry<String, Integer>> entries = new ArrayList<>(map.entrySet());
    entries.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));
    return entries;
  }
}
