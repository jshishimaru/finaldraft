# Generated by Django 5.1.1 on 2024-10-20 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finaldraft', '0013_alter_submission_approved_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='files/'),
        ),
        migrations.AddField(
            model_name='attachment',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='attachment',
            name='type',
            field=models.CharField(choices=[('URL', 'URL'), ('IMAGE', 'IMAGE'), ('FILE', 'FILE')], max_length=50),
        ),
    ]
