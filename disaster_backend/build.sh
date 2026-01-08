#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py migrate

python manage.py collectstatic --no-input

# Load data if present (optional, usually manual, but script can do it if desired. 
# User said "After deploy: python manage.py loaddata data.json". 
# Render build script runs at build time. Start command runs at runtime.
# Migrations happen at build or start? Render usually recommends build.
# Data loading on every build might duplicate data if validation doesn't prevent it or if we don't flush.
# I will leave loaddata for valid post-deploy command as requested by user manually)
