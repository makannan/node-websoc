# node-websoc

A Simple server that provides REST interface to view and controll a set of
Raspberry PI controlled devices at home. This project uses both express and
websocket to perform home automation.

There are two parts:

server: This directory contains a nodejs/websocket based server that acts as
the controller. A client (described below) can POST details about devices to
this controller. Only details about registered devices can be POSTed. This
server also provides a way to update the state of a device. This can be used
to turn "on" / "off" a device. The server then notifies the client through
a WebSocket. The client receives the new state through web socket and turns
on / off the device.

client: The client code typically runs in your home (most likely inside a
micro-controller like RaspberryPI / Aurdino etc.). The client performs a
POST to the server whenever a device state changes. The client also opens
up a WebSocket to the server through which it can receive intructions to 
turn on / off devices.

Currently, a RaspberryPI is simulated, but a new directory containing
RaspberryPI specific code is coming soon!!
