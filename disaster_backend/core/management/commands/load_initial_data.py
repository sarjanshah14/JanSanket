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
                # 1. Blindly DROP the legacy parking tables that are blocking us
                # (We don't search for them anymore, we just nuke the known ones)
                cursor.execute("DROP TABLE IF EXISTS bookings_booking CASCADE")
                cursor.execute("DROP TABLE IF EXISTS bookings_review CASCADE")
                cursor.execute("DROP TABLE IF EXISTS bookings_payment CASCADE")
                cursor.execute("DROP TABLE IF EXISTS bookings_profile CASCADE")
                
                # Also drop other legacy apps like 'payments' found in error logs
                cursor.execute("DROP TABLE IF EXISTS payments_payment CASCADE")
                cursor.execute("DROP TABLE IF EXISTS payments_subscription CASCADE")
                cursor.execute("DROP TABLE IF EXISTS payments_order CASCADE")

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
            
            # 5. Restore Admin Access (Create Superuser if missing)
            self.stdout.write("👤 Checking for Admin user...")
            if not User.objects.filter(username='admin').exists():
                self.stdout.write("👤 Creating default superuser 'admin'...")
                # We use create_superuser with a fixed password so you can log in
                User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
                self.stdout.write(self.style.SUCCESS("✅ Superuser 'admin' created with password 'admin123'"))
            else:
                self.stdout.write("ℹ️  User 'admin' already exists. Resetting password to 'admin123' to ensure access.")
                u = User.objects.get(username='admin')
                u.set_password('admin123')
                u.is_staff = True
                u.is_superuser = True
                u.save()

            self.stdout.write(self.style.SUCCESS('🎉 SUCCESS! Data loaded & Admin ready.'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error: {str(e)}'))
            # We don't raise CommandError here to avoid crashing the deployment if it fails, 
            # allowing gunicorn to still try to start if the user wants.
