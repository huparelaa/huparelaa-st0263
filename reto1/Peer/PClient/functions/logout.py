import requests
from globals.globals import get_config_value
def logout():
    IP_ADDRESS = get_config_value("IP_ADDRESS")
    PORT = get_config_value("PORT")
    url = f"http://{IP_ADDRESS}:{PORT}/ps/logout"
    response = requests.get(url)
    print("Logging out")
    print("Bye!")

    exit()