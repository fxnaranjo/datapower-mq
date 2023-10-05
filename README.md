


# Bridge HTTP to IBM MQ

***
The following guide shows the basic configuration needed when a DataPower service connects an HTTP-based messaging system to an IBM MQ system. The handler implements HTTP transport connectivity on the client, which is the front end of the service. On the back end, the service employs IBM MQ URLs to determine the queue to which requests are forwarded and from which replies are pulled.

![Architecture]((https://github.com/fxnaranjo/datapower-mq//raw/main/images/httptomq.png "Architecture")