package com.example;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class FileHandler {
    File file;
    public FileWriter writer;

    public FileHandler(String name) {
        try {
            file = new File(name);
            if (file.createNewFile()) {
                System.out.println("File created: " + file.getName());
            } else {
                System.out.println("File already exist");
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    public Boolean isValid() {
        return this.file != null;
    }

    public FileWriter loadWriter() {
        if (writer == null)
            try {
                writer = new FileWriter(this.file);
                return writer;
            } catch (IOException e) {
                System.out.println("An error has occurred");
                e.printStackTrace();
                return null;
            }
        else
            return writer;
    }

    public void closeWriter() {
        try {
            this.writer.close();
        } catch (IOException e) {
            System.out.println("An error has occurred closing writer");
            e.printStackTrace();
        }
    }

    public void write(String message) {
        try {
            this.writer.write(message);
        } catch (IOException e) {
            System.out.println("An error has occurred writing");
            e.printStackTrace();
        }
    }
}
