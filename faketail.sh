
#lock
# sleep 2
# echo "2019-01-28 01:30:17,275 - api - INFO - Received Sensor Feedback for device 10" >> log.log
# sleep 0.2
# echo "2019-01-28 01:30:17,294 - api - INFO - data: {'timestamp': u'2019-01-28 01:30:15', 'setpoint': None, 'type': u'lock', 'value': u'0'}" >> log.log
# sleep 0.2
# echo "2019-01-28 01:30:17,382 - controller - INFO - Send Sensor Data: [{'localId': u'10', 'value': u'0', 'sensorType': u'lock', 'timeIssued': '2019-01-28 01:30:15', 'deviceId': 71059, 'gatewayId': 71050, 'uid': 17082}]" >> log.log
# sleep 0.2
# echo "127.0.0.1 - - [2019-01-28 01:30:17] \"POST /api/devices/10 HTTP/1.1\" 201 131 0.198271" >> log.log
# sleep 2

# echo "2019-01-28 01:30:24,966 - api - INFO - Received Sensor Feedback for device 10" >> log.log
# sleep 0.2
# echo "2019-01-28 01:30:24,984 - api - INFO - data: {'timestamp': u'2019-01-28 01:30:23', 'setpoint': None, 'type': u'lock', 'value': u'255'}" >> log.log
# sleep 0.2
# echo "2019-01-28 01:30:25,073 - controller - INFO - Send Sensor Data: [{'localId': u'10', 'value': u'255', 'sensorType': u'lock', 'timeIssued': '2019-01-28 01:30:23', 'deviceId': 71059, 'gatewayId': 71050, 'uid': 17083}]" >> log.log
# sleep 0.2
# echo "127.0.0.1 - - [2019-01-28 01:30:25] \"POST /api/devices/10 HTTP/1.1\" 201 131 0.189445" >> log.log



#switch
sleep 2
echo "2019-01-28 01:28:38,064 - api - INFO - Received Sensor Feedback for device 13" >> log.log
sleep 0.2
echo "2019-01-28 01:28:38,082 - api - INFO - data: {'timestamp': u'2019-01-28 01:28:36', 'setpoint': None, 'type': u'switchOn', 'value': u'on'}" >> log.log
sleep 0.2
echo "2019-01-28 01:28:38,140 - controller - INFO - Send Sensor Data: [{'localId': u'13', 'value': u'on', 'sensorType': u'switchOn', 'timeIssued': '2019-01-28 01:28:36', 'deviceId': 71062, 'gatewayId': 71050, 'uid': 17080}]" >> log.log
sleep 0.2

sleep 10
echo "2019-01-28 01:28:38,064 - api - INFO - Received Sensor Feedback for device 13" >> log.log
sleep 0.2
echo "2019-01-28 01:28:38,082 - api - INFO - data: {'timestamp': u'2019-01-28 01:28:36', 'setpoint': None, 'type': u'switchOn', 'value': u'off'}" >> log.log
sleep 0.2
echo "2019-01-28 01:28:38,140 - controller - INFO - Send Sensor Data: [{'localId': u'13', 'value': u'off', 'sensorType': u'switchOn', 'timeIssued': '2019-01-28 01:28:36', 'deviceId': 71062, 'gatewayId': 71050, 'uid': 17080}]" >> log.log
sleep 0.2

