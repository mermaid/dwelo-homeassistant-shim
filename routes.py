from resources import controller, node, commands
from resources.base import Version


def init_routes(api, zwave_app):
    api.add_resource(Version, "/version/")

    # controller
    CONTROLLER_ROUTE = "/controller/"
    api.add_resource(controller.Reset, "{0}reset/".format(CONTROLLER_ROUTE),
                     resource_class_kwargs={"zwave": zwave_app})
    api.add_resource(controller.Status, "{0}status/".format(CONTROLLER_ROUTE),
                     resource_class_kwargs={"zwave": zwave_app})
    api.add_resource(
        controller.ControllerID,
        "{0}id/".format(CONTROLLER_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        controller.ControllerVersion,
        "{0}version/".format(CONTROLLER_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        controller.UpdateNetwork,
        "{0}network/update/".format(CONTROLLER_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        controller.HealNetwork,
        "{0}network/heal/".format(CONTROLLER_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )

    # inclusion
    INCLUSION_ROUTE = "{0}inclusion/".format(CONTROLLER_ROUTE)
    api.add_resource(
        controller.InclusionStart,
        "{0}start/".format(INCLUSION_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        controller.InclusionStop,
        "{0}stop/".format(INCLUSION_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )

    # exclusion
    EXCLUSION_ROUTE = "{0}exclusion/".format(CONTROLLER_ROUTE)
    api.add_resource(
        controller.ExclusionStart,
        "{0}start/".format(EXCLUSION_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        controller.ExclusionStop,
        "{0}stop/".format(EXCLUSION_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )

    # node
    NODE_ROUTE = "/device/<int:node_id>/"
    api.add_resource(node.NodeList, "/device/",
                     resource_class_kwargs={"zwave": zwave_app})
    api.add_resource(node.NodeProtocol, NODE_ROUTE,
                     resource_class_kwargs={"zwave": zwave_app})
    api.add_resource(
        node.NeighborUpdate,
        "{0}neighbor/update/".format(NODE_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(node.NodeInfo, "{0}info/".format(NODE_ROUTE),
                     resource_class_kwargs={"zwave": zwave_app})
    api.add_resource(node.RoutingTable, "{0}routing/".format(NODE_ROUTE),
                     resource_class_kwargs={"zwave": zwave_app})
    api.add_resource(
        node.AssociationGroups,
        "{0}association/group/".format(NODE_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        node.AssociationSet,
        "{0}association/set/".format(NODE_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(node.AssociationGet, "{0}association/".format(NODE_ROUTE),
                     resource_class_kwargs={"zwave": zwave_app})
    api.add_resource(node.SecurityScheme, "{0}security/".format(NODE_ROUTE),
                     resource_class_kwargs={"zwave": zwave_app})

    # commands
    COMMAND_ROUTE = "{0}command/".format(NODE_ROUTE)
    # - binary switch commands
    api.add_resource(commands.BinaryStatus, "{0}binary/".format(COMMAND_ROUTE),
                     resource_class_kwargs={"zwave": zwave_app})
    api.add_resource(
        commands.BinarySet,
        "{0}binary/<mode>/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )

    # - multilevel switch commands
    api.add_resource(
        commands.MultilevelStatus,
        "{0}multilevel/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.MultilevelSet,
        "{0}multilevel/<mode>/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )

    # - thermostat commands
    api.add_resource(
        commands.ThermostatModeStatus,
        "{0}thermostat/mode/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.ThermostatModeSet,
        "{0}thermostat/mode/<mode>/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.ThermostatHumidityStatus,
        "{0}thermostat/humidity/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.ThermostatTemperatureStatus,
        "{0}thermostat/temperature/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.ThermostatSetPointStatus,
        "{0}thermostat/setpoint/<mode>/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.ThermostatSetPointSet,
        "{0}thermostat/setpoint/<mode>/<temperature>/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.ThermostatOperatingStatus,
        "{0}thermostat/state/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )

    # - battery commands
    api.add_resource(
        commands.BatteryStatus,
        "{0}battery/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )

    # - door commands
    api.add_resource(
        commands.DoorLockSet,
        "{0}door/lock/<mode>/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.DoorLockStatus,
        "{0}door/lock/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.DoorUserCodeGet,
        "{0}door/pin/<user_id_code>/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.DoorUserCodeSet,
        "{0}door/pin/<user_id_code>/set/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
    api.add_resource(
        commands.DoorUserCodeDelete,
        "{0}door/pin/<user_id_code>/delete/".format(COMMAND_ROUTE),
        resource_class_kwargs={"zwave": zwave_app}
    )
