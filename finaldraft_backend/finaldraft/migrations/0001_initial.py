# Generated by Django 5.1.1 on 2024-09-30 20:22

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('date', models.DateField(default=datetime.date.today)),
                ('deadline', models.DateField()),
                ('description', models.CharField(max_length=50)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('reviewee', models.ManyToManyField(related_name='reviewee_assignments', to=settings.AUTH_USER_MODEL)),
                ('reviewer', models.ManyToManyField(related_name='reviewer_assignments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GroupInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('is_admin', models.BooleanField()),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('remark', models.CharField(max_length=200)),
                ('date', models.DateField(default=datetime.date.today)),
                ('is_completed', models.BooleanField()),
                ('iteration_no', models.IntegerField()),
                ('approved_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='approved_submissions', to=settings.AUTH_USER_MODEL)),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finaldraft.assignment')),
                ('reviewee', models.ManyToManyField(related_name='reviewee_submissions', to=settings.AUTH_USER_MODEL)),
                ('reviewer', models.ManyToManyField(related_name='reviewer_submissions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Attachment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('URL', 'URL'), ('PDF', 'PDF'), ('IMAGE', 'Image')], max_length=50)),
                ('url', models.URLField(blank=True, null=True)),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finaldraft.assignment')),
                ('submission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finaldraft.submission')),
            ],
        ),
        migrations.CreateModel(
            name='Subtask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('date', models.DateField(default=datetime.date.today)),
                ('deadline', models.DateField()),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finaldraft.assignment')),
            ],
        ),
        migrations.CreateModel(
            name='SubtaskInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('iteration_no', models.IntegerField()),
                ('is_completed', models.BooleanField()),
                ('submission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finaldraft.submission')),
                ('subtask', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finaldraft.subtask')),
            ],
        ),
    ]
