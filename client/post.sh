#! /bin/bash

curl -X POST -H "Content-Type: application/json" localhost:8080/devices -d'{"id": 1, "customerId": "AE123MK", "name": "light-1", "value": 1}'
curl -X POST -H "Content-Type: application/json" localhost:8080/devices -d'{"id": 2, "customerId": "AE123MK", "name": "light-2", "value": 1}'
curl -X POST -H "Content-Type: application/json" localhost:8080/devices -d'{"id": 3, "customerId": "AE123MK", "name": "light-3", "value": 0}'
curl -X POST -H "Content-Type: application/json" localhost:8080/devices -d'{"id": 4, "customerId": "AE123MK", "name": "tv", "value": 1}'
curl -X POST -H "Content-Type: application/json" localhost:8080/devices -d'{"id": 5, "customerId": "AE123MK", "name": "coffee-maker", "value": 0}'
