package domain;

public class Person {
    private int rank;
    private String personName;
    private int age;
    private double finalWorth;
    private String category;
    private String source;
    private String country;
    private String state;
    private String city;
    private String organization;
    private boolean selfMade;
    private String gender;
    private String birthDate;
    private String title;
    private int philanthropyScore;
    private String bio;

    public Person(int rank, String personName, int age, double finalWorth, String category,
            String source, String country, String state, String city, String organization,
            boolean selfMade, String gender, String birthDate, String title, int philanthropyScore,
            String bio) {
        this.rank = rank;
        this.personName = personName;
        this.age = age;
        this.finalWorth = finalWorth;
        this.category = category;
        this.source = source;
        this.country = country;
        this.state = state;
        this.city = city;
        this.organization = organization;
        this.selfMade = selfMade;
        this.gender = gender;
        this.birthDate = birthDate;
        this.title = title;
        this.philanthropyScore = philanthropyScore;
        this.bio = bio;
    }

    public String getCountry() {
        return country.toLowerCase();
    }

    public String getCategory() {
        return category.toLowerCase();
    }

    public String getSource() {
        return source.toLowerCase();
    }

    public String getState() {
        return state.toLowerCase();
    }

    public String getCity() {
        return city.toLowerCase();
    }

    public String getOrganization() {
        return organization.toLowerCase();
    }

    public String getGender() {
        return gender.toLowerCase();
    }

    public String getTitle() {
        return title.toLowerCase();
    }

    public String getBio() {
        return bio.toLowerCase();
    }
}
