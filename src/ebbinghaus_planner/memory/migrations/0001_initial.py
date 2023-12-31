# Generated by Django 4.2.4 on 2023-08-20 20:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Memory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ReviewDate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='MemoryReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reviewed', models.BooleanField(default=False)),
                ('memory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='memory.memory')),
                ('review_date', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='memory.reviewdate')),
            ],
        ),
        migrations.AddField(
            model_name='memory',
            name='review_dates',
            field=models.ManyToManyField(related_name='memories', through='memory.MemoryReview', to='memory.reviewdate'),
        ),
    ]
