from . import util_function
def upload():
    # Get peer to upload
    response = util_function.getAvailablePeer()
    #response: {'id': '6b85d36b-8bcd-40c8-ad9f-de78244dc85d', 'ip': '127.0.0.1', 'port': '12345', 'files': []}
    if response == "No peer available" or response == "Not logged in" or response == "No available peers":
        print("No peer available")
        return
    address = "http://"+response['ip']+":"+response['port']+"/upload"
    print(address)