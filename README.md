


# Bridge HTTP to IBM MQ

***
The following guide shows the basic configuration needed when a DataPower service connects an HTTP-based messaging system to an IBM MQ system. The handler implements HTTP transport connectivity on the client, which is the front end of the service. On the back end, the service employs IBM MQ URLs to determine the queue to which requests are forwarded and from which replies are pulled.

![Architecture](https://github.com/fxnaranjo/datapower-mq//raw/main/images/httptomq.png "Architecture")

You can find more information about this topic on: [Datapower Documentation](https://www.ibm.com/docs/en/datapower-gateway/10.5.0?topic=mq-basic-scenarios)

### 1.Requirements
- IBM Datapower Physical Appliance/Virtual Machine/Docker Container
- IBM MQ V9.X
- App Connect Enterprise 12.x

### 2.Preparing MQ Environment
- You must have access to an IBM MQ Queue Manager V9+ in order to create the queues for the excersice
- You can execeute the following commands in you IBM MQ environment to create the queues
`
runmqsc <QUEUE_MANAGER_MAME>
DEFINE QLOCAL('DP_IN') REPLACE
DEFINE QLOCAL('DP_OUT') REPLACE
EXIT
`


