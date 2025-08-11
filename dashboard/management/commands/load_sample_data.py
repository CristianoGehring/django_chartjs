import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from dashboard.models import SalesData

class Command(BaseCommand):
    help = 'Loads sample data into the database'

    def handle(self, *args, **options):
        self.stdout.write('Deleting old data...')
        SalesData.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()

        self.stdout.write('Creating superuser...')
        if not User.objects.filter(username='admin').exists():
            admin_user = User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        else:
            admin_user = User.objects.get(username='admin')

        # Assign custom permission to admin
        content_type = ContentType.objects.get_for_model(SalesData)
        permission = Permission.objects.get(
            codename='view_detailed_analysis',
            content_type=content_type,
        )
        admin_user.user_permissions.add(permission)

        self.stdout.write('Creating sample sales data...')
        products = ['Product A', 'Product B', 'Product C', 'Product D']
        today = timezone.now()

        for _ in range(50):
            SalesData.objects.create(
                date=today - timedelta(days=random.randint(0, 30)),
                product=random.choice(products),
                amount=round(random.uniform(100.0, 1000.0), 2),
                quantity=random.randint(1, 10)
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully loaded sample data!'))
