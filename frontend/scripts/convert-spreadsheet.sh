#!/usr/bin/env bash

cd ../songlist

path=$(find *.xlsx)
ssconvert "$path" temp.csv
sed -i '1 s/^.*$/location,artist,title/' temp.csv
csvtojson temp.csv > entries.json
mv entries.json ../src/assets