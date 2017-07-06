#!/usr/bin/python
# -*- coding: utf-8 -*-

import csv
import json
import sys
import os

def main():
    """
    Script that takes the file name "input.csv" and convert it into a .json
    file named output.json
    The first row of the csv file is the field name,
    the other rows are the values

    """
    filepath = "input.csv"
    delim = ";"

    if len(sys.argv) > 1:
        filepath = sys.argv[1]
        if len(sys.argv) > 2:
            delim = ";"

    conversion(filepath, delim, "output.json")

def conversion(path, delim, json_filename):
    """
    Convert the csv file from path into an output.json
    delim is used to specify the delimiters of the csv file

    """
    csv_input = []

    try:
        #Conversion csv to json
        with open(path,"rt") as csv_file:
            reader = csv.reader(csv_file, delimiter=delim, quoting=csv.QUOTE_ALL)
            fieldnames = next(reader)
            reader = csv.DictReader(csv_file, delimiter=delim, fieldnames=fieldnames)
            for row in reader:
                if row[fieldnames[0]] != '':
                    csv_input.append(row)
            to_json(json_filename, csv_input)

    except FileNotFoundError:
        print(path +" was not found")


def to_json(filename, csv_input):
    """
    Create a json file from a csv_input

    """
    if not filename.endswith(".json"):
        if filename == "":
            filename = "output"
        filename += filename + ".json"

    with open(os.path.join(os.path.realpath('..'), 'src', filename), 'w+') as json_file:
        json_output = json.dumps(csv_input, sort_keys=True)
        json_file.write(json_output)


if __name__ == '__main__':
    main()
