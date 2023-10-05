


# Bridge HTTP to IBM MQ

***
The following guide shows the basic configuration needed when a DataPower service connects an HTTP-based messaging system to an IBM MQ system. The handler implements HTTP transport connectivity on the client, which is the front end of the service. On the back end, the service employs IBM MQ URLs to determine the queue to which requests are forwarded and from which replies are pulled.

![Architecture](https://github.com/fxnaranjo/datapower-mq//raw/main/images/httptomq.png "Architecture")

You can find more information about this topic on: [Datapower Documentation](https://www.ibm.com/docs/en/datapower-gateway/10.5.0?topic=mq-basic-scenarios)

### 1.Requirements
- IBM Datapower Physical Appliance/Virtual Machine/Docker Container (IDG.10.5.0.6)
- IBM MQ V9.X
- App Connect Enterprise 12.x with associated MQ

### 2.Preparing MQ Environment
- You must have access to an IBM MQ Queue Manager V9+ in order to create the queues for the excersice
- You can execeute the following commands in you IBM MQ environment to create the queues
```
runmqsc <QUEUE_MANAGER_MAME>
DEFINE QLOCAL('DP_IN') REPLACE
DEFINE QLOCAL('DP_OUT') REPLACE
EXIT
```

### 2.Preparing ACE(App Connect Enterprise) Environment
- Obtain the project interchage files from [here](https://github.com/fxnaranjo/datapower-mq/blob/main/ace/HTTP2MQ.zip) if you want to review and change the flow that acts as a backend service for the exercise.
- Obtain the deployable ACE bar file from [here](https://github.com/fxnaranjo/datapower-mq/blob/main/Datapowerproject.generated.bar) to deploy the backend service to your ACE environment.


