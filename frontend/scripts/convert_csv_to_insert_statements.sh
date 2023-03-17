# get path from args
path=$1

# format value
function format_value() {
  # trim leading and trailing whitespace
  value=$(echo "$1" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
  # remove quotes
  value=$(echo "$value" | sed "s/['\"]//g")
  # wrap with double quotes
  value=$(echo "\"$value\"")
  echo "$value"
}
# clear output file
echo "" >output.sql

# read contents of file at path
while IFS= read -r line; do
  # split line into array
  IFS=',' read -r -a array <<<"$line"
  # if array has more than 3 values, print it
  if [ ${#array[@]} -gt 3 ]; then
    echo "Line has more than 3 values: $line"
  fi
  # trim leading and trailing whitespace and quotes of array elements
  LOCATION=$(format_value "${array[0]}")
  ARTIST=$(format_value "${array[1]}")
  TITLE=$(format_value "${array[2]}")

  # output insert statement to new file
  echo "INSERT INTO SONG (LOCATION, ARTIST, TITLE) VALUES (${LOCATION}, ${ARTIST}, ${TITLE});" >>output.sql
done <"$path"
