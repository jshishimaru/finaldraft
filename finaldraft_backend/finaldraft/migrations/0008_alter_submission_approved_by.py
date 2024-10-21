# Generated by Django 5.1.1 on 2024-10-15 18:40

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finaldraft', '0007_remove_submission_subtask_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='approved_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='approved_submissions', to=settings.AUTH_USER_MODEL),
        ),
    ]
