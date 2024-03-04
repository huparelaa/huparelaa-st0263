from globals.globals import load_global_config
from options import upload, download, logout
def main():
    # Cargar la configuración global al inicio
    load_global_config()

    print("Welcome to P2P File Sharing System!")
    while True:
        print("\nChoose an option:")
        print("1. Upload file")
        print("2. Download file")
        print("3. Logout")

        choice = input("> ")
        
        #remove blank spaces
        choice = choice.strip()

        if choice == '1':
            upload()
        elif choice == '2':
            download()
        elif choice == '3':
            logout()
        else:
            print("Invalid option, please choose again.")

if __name__ == "__main__":
    main()