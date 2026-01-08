import json
import os

file_path = 'fixtures/data.json'

if not os.path.exists(file_path):
    print(f"File {file_path} not found.")
    exit(1)

try:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except UnicodeDecodeError:
        with open(file_path, 'r', encoding='utf-16') as f:
            data = json.load(f)

    new_data = []
    removed_images_count = 0
    removed_models_count = 0

    for entry in data:
        if entry['model'] == 'core.shelterimage':
            removed_models_count += 1
            continue
        
        if 'fields' in entry:
            if 'image' in entry['fields']:
                del entry['fields']['image']
                removed_images_count += 1
        
        new_data.append(entry)

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, indent=2)

    print(f"Fixture cleaned. Removed {removed_models_count} ShelterImage entries and {removed_images_count} image fields.")

except Exception as e:
    print(f"Error cleaning fixture: {e}")
