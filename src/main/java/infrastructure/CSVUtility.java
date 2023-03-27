package infrastructure;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.*;

import domain.Person;
import com.opencsv.CSVReader;
public class CSVUtility {
    public static List<Person> readCSV(String filePath) {
        List<Person> people = new ArrayList<>();

        try (CSVReader br = new CSVReader(new FileReader(filePath))) {
            String[] nextLine;
            nextLine = br.readNext();
            nextLine = br.readNext();
            while ((nextLine = br.readNext()) != null) {
                int rank = Integer.parseInt(nextLine[0]);
                String personName = nextLine[1];
                int age = 0;
                if(!nextLine[2].isEmpty()) {
                    age = Integer.parseInt(nextLine[2]);
                }
                double finalWorth = 0;
                if(!nextLine[3].isEmpty()) {
                    finalWorth = Double.parseDouble(nextLine[3]);
                }
                String category = nextLine[4];
                String source = nextLine[5];
                String country = nextLine[6];
                String state = nextLine[7];
                String city = nextLine[8];
                String organization = nextLine[9];
                boolean selfMade = Boolean.parseBoolean(nextLine[10]);
                String gender = nextLine[11];
                String birthDate = nextLine[12];
                String title = nextLine[13];
                int philanthropyScore = 0;
                if(!nextLine[14].isEmpty()) {
                    philanthropyScore = Integer.parseInt(nextLine[14]);
                }
                String bio = nextLine[15];

                Person person = new Person(rank, personName, age, finalWorth, category, source,
                        country, state, city, organization, selfMade, gender, birthDate, title,
                        philanthropyScore, bio);

                people.add(person);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return people;
    }

    public static void sortPeopleByCountry(List<Person> people) {
        people.sort(Comparator.comparing(Person::getCountry));
    }

    public static Map<String, Integer> countCommonAttributes(List<Person> people) {
        Map<String, Integer> attributeCounts = new HashMap<>();

        for (Person person : people) {
            String[] attributes = { person.getCategory(), person.getSource(), person.getState(),
                    person.getCity(), person.getOrganization(), person.getGender(), person.getTitle(),
                    person.getBio() };

            for (String attribute : attributes) {
                if (!attribute.isEmpty()) {
                    attributeCounts.put(attribute, attributeCounts.getOrDefault(attribute, 0) + 1);
                }
            }
        }

        return attributeCounts;
    }

    public static void increment(Map<String, Integer> map, String key) {
        Integer frequency = map.get(key);
        if (frequency == null) {
            map.put(key, 1);
        } else {
            map.put(key, frequency + 1);
        }
    }

    public static String getMostCommonAttribute(Map<String, Integer> attributeFrequency) {
        String mostCommonAttribute = null;
        int maxFrequency = 0;
        for (Map.Entry<String, Integer> entry : attributeFrequency.entrySet()) {
            System.out.println(entry.getKey()+" : "+entry.getValue());
            String attribute = entry.getKey();
            int frequency = entry.getValue();
            if (frequency > maxFrequency) {
                mostCommonAttribute = attribute;
                maxFrequency = frequency;
            }
        }
        return mostCommonAttribute;
    }
}