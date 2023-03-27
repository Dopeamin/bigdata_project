import infrastructure.CSVUtility;

import java.io.FileReader;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        String csvFile = args[0];
        List<String[]> data = CSVUtility.readCSV(csvFile);

        // Get most common values for each field
        CSVUtility.getMostCommonValues(data);

        // Get most common values for each field per country
        CSVUtility.getMostCommonValuesByCountry(data);
    }
}
