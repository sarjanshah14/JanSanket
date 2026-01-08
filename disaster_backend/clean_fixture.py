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
    kept_count = 0
    removed_count = 0

    # Whitelist of models we actually need to migrate
    ALLOWED_PREFIXES = ['core.', 'auth.user']

    for entry in data:
        model = entry.get('model', '')
        
        # Check if model is in our allow-list
        if any(model.startswith(prefix) for prefix in ALLOWED_PREFIXES):
            # Final Safety: Remove 'image' fields if they exist (we don't have the files)
            if 'fields' in entry and 'image' in entry['fields']:
                del entry['fields']['image']
            
            new_data.append(entry)
            kept_count += 1
        else:
            removed_count += 1

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, indent=2)

    print(f"Fixture cleaned aggressively.")
    print(f"Kept: {kept_count} entries (Users + Core App).")
    print(f"Removed: {removed_count} entries (Admin logs, ContentTypes, Sessions, etc).")

except Exception as e:
    print(f"Error cleaning fixture: {e}")

