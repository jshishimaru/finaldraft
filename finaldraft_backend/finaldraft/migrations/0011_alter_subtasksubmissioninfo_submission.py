# Generated by Django 5.1.1 on 2024-10-17 21:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finaldraft', '0010_delete_subtaskinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subtasksubmissioninfo',
            name='submission',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='finaldraft.submission'),
        ),
    ]
