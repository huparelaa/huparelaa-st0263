import json
import os

def read_config_file(file_path='../config.json'):
    try:
        # see path
        file_path = os.path.join(os.path.dirname(__file__), file_path)

        with open(file_path, 'r') as config_file:
            config = json.load(config_file)
            return config
    except FileNotFoundError:
        print(f"El archivo de configuración {file_path} no fue encontrado.")
        return {}
    except json.JSONDecodeError:
        print(f"El archivo de configuración {file_path} no tiene un formato JSON válido.")
        return {}

# Estado global para almacenar las configuraciones
global_config = {}

def load_global_config():
    global global_config
    config = read_config_file()
    global_config.update(config)

def get_config_value(key, default=None):
    return global_config.get(key, default)

def set_config_value(key, value):
    global global_config
    global_config[key] = value
    return global_config