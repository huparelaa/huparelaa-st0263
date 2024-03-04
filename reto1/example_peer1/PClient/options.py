from functions.logout import logout as f_logout
from functions.grpc import upload_file as f_upload
from functions.grpc import download_file as f_download

def logout():
    f_logout()

def upload():
    fileName = input("Enter the file name: ")
    f_upload(file_name=fileName)

def download():
    fileName = input("Enter the file name: ")
    f_download(file_name=fileName)