# Generated by Django 5.1.1 on 2024-10-20 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finaldraft', '0016_remove_attachment_url_submission_repo_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='is_for_submission',
            field=models.BooleanField(default=False),
        ),
    ]
