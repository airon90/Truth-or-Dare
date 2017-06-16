#!/usr/bin/python
# -*- coding: utf-8 -*-

import csv 
import json
import sys

def main():  
    """
    Script that takes the file name "input.csv" and convert it into a .json
    file named output.json
    The first row of the csv file is the field name, 
    the other rows are the values

    """
    csv_input = []
    filepath = "input.csv"
    delim = ";"

    if len(sys.argv) > 1:
        filepath = sys.argv[1]
        if len(sys.argv) > 2:
            delim = ";"
    
    try:
        
        #Conversion csv to json        
        with open(filepath,"rt") as csv_file:
            reader = csv.reader(csv_file, delimiter=delim, quoting=csv.QUOTE_ALL)
            fieldnames = next(reader)
            reader = csv.DictReader(csv_file, delimiter=';', fieldnames=fieldnames)
            for row in reader:
                csv_input.append(row)
            with open('output.json', 'w+') as json_file:
                json_output = json.dumps([ csv_input ], sort_keys=True)
                json_file.write(json_output)
    
    except FileNotFoundError:
        print(filepath +" was not found")

if __name__ == '__main__':
    main()
