import grpc
import file_management_pb2
import file_management_pb2_grpc
from . import util_function

def upload_file(file_name):
    response = util_function.getAvailablePeer()
    if response in ["No peer available", "Not logged in", "No available peers"]:
        print("No peer available")
        return

    grpc_port = "50051"  # Asumiendo que el puerto gRPC está definido aquí
    ip_address = response['ip']
    url = util_function.transformTogRPCUrl(ip_address, grpc_port)
    print(f"Uploading file to: {url}")

    # Crear un canal gRPC y un cliente
    channel = grpc.insecure_channel(url)
    client = file_management_pb2_grpc.FileTransferServiceStub(channel)

    # Hacer la llamada gRPC
    try:
        file_request = file_management_pb2.FileRequest(name=file_name)
        response = client.UploadFile(file_request)
        print(f"Upload Response: {response.message}")
    except grpc.RpcError as e:
        print(f"gRPC call failed: {e}")


def download_file(file_name):
    response = util_function.getAvailablePeer()
    if response in ["No peer available", "Not logged in", "No available peers"]:
        print("No peer available")
        return

    grpc_port = "50051"
    ip_address = response['ip']
    url = util_function.transformTogRPCUrl(ip_address, grpc_port)

    # Crear un canal gRPC y un cliente
    channel = grpc.insecure_channel(url)
    client = file_management_pb2_grpc.FileTransferServiceStub(channel)

    # Hacer la llamada gRPC para descargar el archivo
    try:
        file_request = file_management_pb2.FileRequest(name=file_name)
        response = client.DownloadFile(file_request)
        if response.success:
            print(f"Download Response: {response.message}")
        else:
            print(f"Failed to download the file: {response.message}")
    except grpc.RpcError as e:
        print(f"gRPC call failed: {e}")