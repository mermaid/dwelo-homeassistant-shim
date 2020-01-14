# Dwelo HASS Shim
This project connects dwelo (a smarthome platform for apartments) to homeassistant.

# I CAN'T HELP YOU WITH THIS ANYMORE
I didn't open source this out of fear that dwelo would catch on and remove/change stuff and break me.
I now don't live in the apartment complex, so I'm open sourcing it now in hopes that people can benefit from it.

# The Point
The point of this project was to
1. Get the smarthome devices in dwelo connected to homekit
2. Leave all dwelo things as it, it (dwelo) still needs to work 100% as it originally did

For that reason, instead of hijacking the ZWAVE controller (which is totally possible), I built a shim program that reads data output by dwelo logs and syncs it up to the homeassistant switch. If setting from homeassistant, hass will call the shim program, which will talk to the private dwelo api and trigger that change. I only had switches hooked up. A lock was hooked up at one point in time, but was slow reporting the info/receiving commands and I didn't ever use it, so I didn't care about writing code around that pitfall.

The program has run nearly a year (with PM2) without needing intervention by me. It did need intervention after a power outage.

# How to use
1. Get physical access to the dwelo-hub
   - In my case, it was a physical raspberry pi connected to the router
   - Log into your router and see if you can find an IP addess for it
   - You can check if you have the right IP by going to <ip>:9001 and see if you find the dwelo status screen
   - You can also try http://dwelo-hub.local:9001 and see if you can see it there.
2. Create yourself a user
3. Install homeassistant (If you have an existing homeassistant, you *should* be able to edit the config/config.js file with that info)
   1. You may also need to make sure that the `dwelo-shim` port is open to the world
4. Pull this project
5. run `node getHassConfigs` to generate you home assistant confgis
   - Probably only works for switches
6. Put those configs into home assistants and reboot it
7. Run this project using `pm2 start` or `npm run start`
8. You should now have home assistant switches that work!

# Gaining root access
I don't remember 100%, but it went something like this
1. remove SD card, put in another (linux) computer
2. on `boot` in cmdline.txt append `systemd.unit=rescue.target`
3. on the main partition, edit `/lib/systemd/system/rescue.service` and add --force after sulogin to the ExecStart line -> `ExecStart=-/bin/sh -c "/sbin/sulogin --force; ...`

# Various Notes
Theres quite a bit of python files you can find to reverse engineer the API.
The stuff that runs on port 9001 is open to the public network and exposes some info

Base: http://192.168.11.27:9001/api/
Status: http://192.168.11.27:9001/api/controller/status
Get Devices: http://192.168.11.27:9001/api/devices/
Lock/unlock local: localhost:5000/device/10/command/door/lock/close/
Edit name of device: http://192.168.11.27:9001/devices/10/update/

The stuff that runs on port 5000 actually controls the devices and can lock/unlock, turn on/off lights, etc.

Useful dwelo files
- `/home/dwelo/hub/bin/activate`
- `/home/dwelo/zipgateway/bin/activate`
  - has the serial port that dwelo uses to talk to the z-wave devices
  - also has the db user/password that has some interesting info in it
- `/var/cache/salt/minion/files/base/gateway/production/files/etc/supervisor/conf.d/`
  - a few files in this dir
  - `zipgateway.conf` has the z wave encryption key on it (for secure devices like locks)
- db tables
+----------------------+
| Tables_in_dweloHub   |
+----------------------+
| Abilities            |
| AccessCodeSlotStatus |
| AccessCodes          |
| Actions              |
| AddressMaps          |
| Addresses            |
| AlertViews           |
| Alerts               |
| CommandQueue         |
| Communities          |
| Devices              |
| GatewaySettings      |
| GeoFences            |
| Occupants            |
| Permissions          |
| Permissions_history  |
| PubNubChannelGroups  |
| PubNubChannels       |
| RoleAbilities        |
| Roles                |
| Schedules            |
| SensorReadings       |
| UserCommunityRoles   |
| Users                |
| alembic_version      |
+----------------------+

