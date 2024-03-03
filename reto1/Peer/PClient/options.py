from functions.download import download as f_download
from functions.upload import upload as f_upload
from functions.logout import logout as f_logout

def logout():
    f_logout()

def upload():
    print("Upload file")
    print("File path: ")
    file_path = input()
    return file_path

def download():
    print("Download file")
    print("File name: ")
    file_name = input()
    return file_name