## Log Server

This project is a way to netcat any server logs to a link.

**Example:**

`echo "hello!" | nc logs.tritan.dev 99`

`tail -n 100 /etc/pathvector.log | nc logs.tritan.dev 99`

etc

**Output:**

https://logs.tritan.dev/8khv2z0c --> contains `hello!`

https://logs.tritan.dev/8khsdadc --> contains pathvector log last 100 lines

etc
