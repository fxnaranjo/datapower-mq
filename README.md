


# Bridge HTTP to IBM MQ

***
The following guide shows the basic configuration needed when a DataPower service connects an HTTP-based messaging system to an IBM MQ system. The handler implements HTTP transport connectivity on the client, which is the front end of the service. On the back end, the service employs IBM MQ URLs to determine the queue to which requests are forwarded and from which replies are pulled.

![Architecture](https://github.com/fxnaranjo/datapower-mq//raw/main/images/httptomq.png "Architecture")

You can find more information about this topic on: [Datapower Documentation](https://www.ibm.com/docs/en/datapower-gateway/10.5.0?topic=mq-basic-scenarios)

### 1.Requirements
- IBM Datapower Physical Appliance/Virtual Machine/Docker Container (IDG.10.5.0.6)
- IBM MQ V9.X
- App Connect Enterprise 12.x with associated MQ
- There must be network connectivity between all components

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

### 3.Configure IBM Datapower Local Queue Manager Connection
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

- In the Connections and CSCI tabs leave the default values
- In the MQCSP Tab configure the username and password to connect to your MQ Server
  ![DP5](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp5.png "DP5")

- Once completed Apply and Save all changes. The new Queue Manager object should be up and running.

  ![DP6](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp6.png "DP6")

***

### 4.Configure IBM Datapower Multi-Protocol Gateway for HTTP to IBM MQ Bridge
- In the web console main page select **Services** and **Multi-Protocol Gateway**

![DP7](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp7.png "DP7")

- In the next screen click **Add** to create the new Multi-Protocol Gateway

![DP8](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp8.png "DP8")

- In the configuration tab, enter the **name** for the Multi-Protocol Gateway, choose the **XML Manager default**, in the **Type** select static-backend and in the Default property Bakend URL enter the URL of the queue manager, in this case **idgmq://MYMQ**,configure a Front Side Protocol to define the interface and port the service will be using.

![DP9](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp9.png "DP9")
![DP10](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp10.png "DP10")

- Next click on **+** to create a new Multi-Protocol Gateway Style Policy
![DP11](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp11.png "DP11")

  - Create a new **Client to Server** rule with the following actions:
    - A match rule to handle the requests of every context: *
    - A gateway script action that configures the input and output queues for the bridge service: the file to be used here is: [config.js](https://github.com/fxnaranjo/datapower-mq/blob/main/datapower/config.js)

    ![DP12](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp12.png "DP12")

  - Create a new **Server to Client** rule with the following actions:
    - A match rule to handle the responses of every context: *
    - A gateway script action to set the response headers for the http request: the file to be used here is: [config2.js](https://github.com/fxnaranjo/datapower-mq/blob/main/datapower/config2.js)

    ![DP13](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp13.png "DP13")

- Once completed Apply and Save all changes.

- Back in the Multi-Protocol Gateway configuration make sure that **Response type** and **Request type** is set to JSON

![DP14](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp14.png "DP14")
![DP15](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp15.png "DP15")

- Once completed Apply and Save all changes.


***

### 5.Testing the Datapower Multi-Protocol Gateway Service
- Once the configuration is done, the service testing can be made using any http method invocation tool using the address, port(Front Side Protocol Handler) and context configured.

![DP16](https://github.com/fxnaranjo/datapower-mq//raw/main/images/dp16.png "DP16")

# Congratulations you have successfully configured an HTTP to IBM MQ Bridge using IBM Datapower