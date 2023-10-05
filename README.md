


# Bridge HTTP to IBM MQ

***
The following guide shows the basic configuration needed when a DataPower service connects an HTTP-based messaging system to an IBM MQ system. The handler implements HTTP transport connectivity on the client, which is the front end of the service. On the back end, the service employs IBM MQ URLs to determine the queue to which requests are forwarded and from which replies are pulled.

![Architecture](https://github.com/fxnaranjo/datapower-mq//raw/main/images/httptomq.png "Architecture")

You can find more information about this topic on: [Datapower Documentation](https://www.ibm.com/docs/en/datapower-gateway/10.5.0?topic=mq-basic-scenarios)

### 1.Requirements
- IBM Datapower Physical Appliance/Virtual Machine/Docker Container (IDG.10.5.0.6)
- IBM MQ V9.X
- App Connect Enterprise 12.x with associated MQ

***

### 2.Preparing MQ Environment
- You must have access to an IBM MQ Queue Manager V9+ in order to create the queues for the excersice
- You can execeute the following commands in you IBM MQ environment to create the queues
```
runmqsc <QUEUE_MANAGER_MAME>
DEFINE QLOCAL('DP_IN') REPLACE
DEFINE QLOCAL('DP_OUT') REPLACE
EXIT
```

***

### 2.Preparing ACE(App Connect Enterprise) Environment
- This flow is the simulated backend for the MQ Service.
- Obtain the project interchage files from [here](https://github.com/fxnaranjo/datapower-mq/blob/main/ace/HTTP2MQ.zip) if you want to review and change the flow that acts as a backend service for the exercise. (Optional)
- Obtain the deployable ACE bar file from [here](https://github.com/fxnaranjo/datapower-mq/blob/main/ace/Datapowerproject.generated.bar) to deploy the backend service to your ACE environment.
- The implemented flow have the following componentes.
  - MQ Input: Listens for messages in the DP_IN queue
  - Compute: Creates the response message and assigns the correlationID to the value of the messageID recieved, this is very important so Datapower is able to get the corresponding response message.
  - MQ Output: Sends the response message to the DP_OUT queue

![ACE](https://github.com/fxnaranjo/datapower-mq//raw/main/images/aceflow.png "ACE")

***

### 3.Configure IBM Datapower objects
- Make sure you have a separete application domain (other than default)
- Look for "IBM MQ" in the seacr bar and select IBM MQ v9+ queue manager

![DP1](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp1.png "DP1")

- In the next screen click **Add** to create the new Queue Manager Connection

![DP2](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp2.png "DP2")
- Configure the properties for the Queue Manager connection:
  - Name (Required): The name for the object, in this case **MYMQ**
  - Host (Required): The hostname and port for your MQ Server
  - Queue manager name: The name of the Queue Manager
  - Channel name: The name of the connection channel
  - Alternate user: Off
  - Units-of-work and backout: 0
  - The rest of properties can be the default ones
  
  ![DP3](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp3.png "DP3")
  ![DP4](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp4.png "DP4")
