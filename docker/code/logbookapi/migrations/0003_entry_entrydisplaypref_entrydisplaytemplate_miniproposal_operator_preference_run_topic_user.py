# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-06-19 17:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logbookapi', '0002_shot'),
    ]

    operations = [
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('username', models.CharField(blank=True, db_column='USERNAME', max_length=31, null=True)),
                ('entered', models.DateTimeField(blank=True, db_column='ENTERED', null=True)),
                ('voided', models.DateTimeField(blank=True, db_column='VOIDED', null=True)),
                ('run', models.IntegerField(blank=True, db_column='RUN', null=True)),
                ('shot', models.IntegerField(blank=True, db_column='SHOT', null=True)),
                ('topic', models.CharField(db_column='TOPIC', max_length=16)),
                ('text', models.TextField(blank=True, db_column='TEXT', null=True)),
                ('dbkey', models.IntegerField(db_column='DBKEY')),
                ('id', models.CharField(db_column='GUID', max_length=36, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'ENTRIES',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EntryDisplayPref',
            fields=[
                ('username', models.CharField(max_length=50, unique=True)),
                ('last_saved', models.DateTimeField()),
                ('run', models.IntegerField()),
                ('topics', models.CharField(max_length=2000)),
                ('user_select', models.CharField(max_length=20)),
                ('show_voided', models.CharField(max_length=1)),
                ('sort_by_shot', models.BooleanField()),
                ('ascending', models.BooleanField()),
                ('null_shots_first', models.BooleanField()),
                ('auto_update', models.BooleanField()),
                ('auto_scroll', models.BooleanField()),
                ('scroll_top', models.BooleanField()),
                ('max_rows', models.SmallIntegerField()),
                ('fontsize', models.SmallIntegerField(blank=True, null=True)),
                ('show_test', models.CharField(blank=True, max_length=1, null=True)),
                ('id', models.CharField(db_column='GUID', max_length=36, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'ENTRY_DISPLAY_PREFS',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EntryDisplayTemplate',
            fields=[
                ('template_name', models.CharField(max_length=50)),
                ('text', models.TextField()),
                ('entered', models.DateTimeField()),
                ('global_field', models.NullBooleanField(db_column='global')),
                ('topic', models.CharField(blank=True, max_length=16, null=True)),
                ('id', models.CharField(db_column='GUID', max_length=36, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'ENTRY_DISPLAY_TEMPLATES',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Miniproposal',
            fields=[
                ('mp', models.IntegerField()),
                ('date_filed', models.DateTimeField()),
                ('title', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=50)),
                ('url', models.CharField(blank=True, max_length=256, null=True)),
                ('status', models.CharField(max_length=20)),
                ('file_date', models.CharField(blank=True, max_length=64, null=True)),
                ('icrf_80_mhz', models.SmallIntegerField(blank=True, db_column='ICRF_80_MHz', null=True)),
                ('icrf_70_mhz', models.SmallIntegerField(blank=True, db_column='ICRF_70_MHz', null=True)),
                ('icrf_50_mhz', models.SmallIntegerField(blank=True, db_column='ICRF_50_MHz', null=True)),
                ('cryopump', models.SmallIntegerField(blank=True, db_column='Cryopump', null=True)),
                ('dnb', models.SmallIntegerField(blank=True, db_column='DNB', null=True)),
                ('rev_b', models.SmallIntegerField(blank=True, db_column='rev_B', null=True)),
                ('high_b', models.SmallIntegerField(blank=True, db_column='high_B', null=True)),
                ('boronize_overnight', models.SmallIntegerField(blank=True, null=True)),
                ('boronize_shots', models.SmallIntegerField(blank=True, null=True)),
                ('comment', models.CharField(blank=True, max_length=256, null=True)),
                ('id', models.CharField(db_column='GUID', max_length=36, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'Miniproposals',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Operator',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('first_shot', models.IntegerField()),
                ('last_shot', models.IntegerField()),
                ('run', models.IntegerField(blank=True, null=True)),
                ('job', models.CharField(max_length=2)),
                ('active', models.BooleanField()),
                ('brief', models.CharField(blank=True, max_length=256, null=True)),
                ('mp', models.IntegerField(blank=True, null=True)),
                ('guid', models.CharField(blank=True, db_column='GUID', max_length=36, null=True)),
            ],
            options={
                'db_table': 'Operators',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('application', models.CharField(max_length=30)),
                ('item', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=1000)),
                ('id', models.CharField(db_column='GUID', max_length=36, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'PREFERENCES',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Run',
            fields=[
                ('username', models.CharField(db_column='USERNAME', max_length=31)),
                ('entered', models.DateTimeField(db_column='ENTERED')),
                ('run', models.IntegerField(db_column='RUN')),
                ('brief', models.CharField(blank=True, db_column='BRIEF', max_length=72, null=True)),
                ('dbkey', models.IntegerField(db_column='DBKEY')),
                ('id', models.CharField(db_column='GUID', max_length=36, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'RUNS',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('username', models.CharField(blank=True, db_column='USERNAME', max_length=31, null=True)),
                ('entered', models.DateTimeField(blank=True, db_column='ENTERED', null=True)),
                ('topic', models.CharField(db_column='TOPIC', max_length=16)),
                ('brief', models.CharField(db_column='BRIEF', max_length=72)),
                ('dbkey', models.IntegerField(db_column='DBKEY')),
                ('sort_order', models.IntegerField(blank=True, db_column='SORT_ORDER', null=True)),
                ('id', models.CharField(db_column='GUID', max_length=36, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'TOPICS',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('name', models.CharField(max_length=50, unique=True)),
                ('po', models.BooleanField(db_column='PO')),
                ('eo', models.BooleanField(db_column='EO')),
                ('active', models.BooleanField()),
                ('phone', models.CharField(blank=True, max_length=50, null=True)),
                ('crphone', models.CharField(blank=True, max_length=50, null=True)),
                ('pager', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
                ('firstname', models.CharField(blank=True, max_length=50, null=True)),
                ('lastname', models.CharField(blank=True, max_length=50, null=True)),
                ('fullname', models.CharField(blank=True, max_length=101, null=True)),
                ('hidden', models.BooleanField()),
                ('comment', models.CharField(blank=True, max_length=50, null=True)),
                ('id', models.CharField(db_column='GUID', max_length=36, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'Users',
                'managed': False,
            },
        ),
    ]
