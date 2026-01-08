from django.core.management.base import BaseCommand, CommandError
from django.core.management import call_command
from django.db import connection
from django.contrib.auth.models import User
import os
from django.conf import settings

class Command(BaseCommand):
    help = 'Aggressively cleans up legacy data and loads initial fixtures'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('🧹 Starting Nuclear Cleanup...'))
        
        try:
            with connection.cursor() as cursor:
                # 1. Find ALL tables starting with 'bookings_' (Legacy Parking App)
                cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'bookings_%'")
                rows = cursor.fetchall()
                
                for row in rows:
                    table_name = row[0]
                    self.stdout.write(f"💥 Dropping legacy table: {table_name}")
                    cursor.execute(f"DROP TABLE IF EXISTS \"{table_name}\" CASCADE")

                # 2. Force delete users with CASCADE
                self.stdout.write("🗑️  Deleting all existing users...")
                cursor.execute("DELETE FROM auth_user CASCADE")
                
                # 3. Clear core tables
                self.stdout.write("🗑️  Clearing core tables...")
                cursor.execute("DELETE FROM core_disaster CASCADE")
                cursor.execute("DELETE FROM core_shelter CASCADE")

            self.stdout.write(self.style.SUCCESS('✅ Database cleaned. Loading data...'))
            
            # 4. Load Data
            call_command('loaddata', 'fixtures/data.json')
            
            self.stdout.write(self.style.SUCCESS('🎉 SUCCESS! Data loaded successfully.'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error: {str(e)}'))
            # We don't raise CommandError here to avoid crashing the deployment if it fails, 
            # allowing gunicorn to still try to start if the user wants.
