from globals.globals import get_config_value
import requests
def getAvailablePeer():
    # POST http://localhost:3000/availablePeer
    # Body: {ip,port}
    IP_ADDRESS = get_config_value("IP_ADDRESS")
    PORT = get_config_value("PORT")
    CENTRAL_SERVER_URL = get_config_value("SERVER_CENTRAL_ADDRESS")
    url = f"{CENTRAL_SERVER_URL}availablePeer"
    response = requests.post(url, json={"ip": IP_ADDRESS, "port": PORT})
    return response.json()
