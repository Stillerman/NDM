# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class User(models.Model):
    id = models.CharField(db_column='GUID', max_length=36 , primary_key=True)  # Field name made lowercase.
    username = models.CharField(max_length=31, unique=True, db_column='NAME')
    po = models.BooleanField(db_column='PO')  # Field name made lowercase.
    eo = models.BooleanField(db_column='EO')  # Field name made lowercase.
    active = models.BooleanField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    crphone = models.CharField(max_length=50, blank=True, null=True)
    pager = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    firstname = models.CharField(max_length=50, blank=True, null=True)
    lastname = models.CharField(max_length=50, blank=True, null=True)
    fullname = models.CharField(max_length=101, blank=True, null=True)
    hidden = models.BooleanField()
    comment = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Users'

class Entry(models.Model):
    username = models.CharField(db_column='USERNAME', max_length=31, blank=True, null=True)  # Field name made lowercase.
    entered = models.DateTimeField(db_column='ENTERED', blank=True, null=True)  # Field name made lowercase.
    voided = models.DateTimeField(db_column='VOIDED', blank=True, null=True)  # Field name made lowercase.
    run = models.IntegerField(db_column='RUN', blank=True, null=True)  # Field name made lowercase.
    shot = models.IntegerField(db_column='SHOT', blank=True, null=True)  # Field name made lowercase.
    topic = models.CharField(db_column='TOPIC', max_length=16)  # Field name made lowercase.
    text = models.TextField(db_column='TEXT', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    dbkey = models.IntegerField(db_column='DBKEY')  # Field name made lowercase.
    id = models.CharField(db_column='GUID', max_length=36, primary_key=True)  # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'ENTRIES'


class EntryDisplayPref(models.Model):
    username = models.ForeignKey(User, db_column='username',related_name='edprefs')
    last_saved = models.DateTimeField()
    run = models.IntegerField()
    topics = models.CharField(max_length=2000)
    user_select = models.CharField(max_length=20)
    show_voided = models.CharField(max_length=1)
    sort_by_shot = models.BooleanField()
    ascending = models.BooleanField()
    null_shots_first = models.BooleanField()
    auto_update = models.BooleanField()
    auto_scroll = models.BooleanField()
    scroll_top = models.BooleanField()
    max_rows = models.SmallIntegerField()
    fontsize = models.SmallIntegerField(blank=True, null=True)
    show_test = models.CharField(max_length=1, blank=True, null=True)
    id = models.CharField(db_column='GUID', max_length=36, primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ENTRY_DISPLAY_PREFS'


class EntryDisplayTemplate(models.Model):
    username = models.ForeignKey(User, db_column='username',related_name='templates')
    template_name = models.CharField(max_length=50)
    text = models.TextField()  # This field type is a guess.
    entered = models.DateTimeField()
    global_field = models.NullBooleanField(db_column='global')  # Field renamed because it was a Python reserved word.
    id = models.IntegerField(primary_key=True)
    topic = models.CharField(max_length=16, blank=True, null=True)
    id = models.CharField(db_column='GUID', max_length=36, primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ENTRY_DISPLAY_TEMPLATES'


class Miniproposal(models.Model):
    id = models.CharField(db_column='GUID', max_length=36, primary_key=True)  # Field name made lowercase.
    mp = models.IntegerField()
    mpid = models.CharField(db_column='ID', max_length=10, primary_key=True)
    date_filed = models.DateTimeField()
    title = models.CharField(max_length=100)
    username = models.ForeignKey(User, db_column='name',related_name='miniproposals')
    url = models.CharField(max_length=256, blank=True, null=True)
    status = models.CharField(max_length=20)
    file_date = models.CharField(max_length=64, blank=True, null=True)
    icrf_80_mhz = models.SmallIntegerField(db_column='ICRF_80_MHz', blank=True, null=True)  # Field name made lowercase.
    icrf_70_mhz = models.SmallIntegerField(db_column='ICRF_70_MHz', blank=True, null=True)  # Field name made lowercase.
    icrf_50_mhz = models.SmallIntegerField(db_column='ICRF_50_MHz', blank=True, null=True)  # Field name made lowercase.
    cryopump = models.SmallIntegerField(db_column='Cryopump', blank=True, null=True)  # Field name made lowercase.
    dnb = models.SmallIntegerField(db_column='DNB', blank=True, null=True)  # Field name made lowercase.
    rev_b = models.SmallIntegerField(db_column='rev_B', blank=True, null=True)  # Field name made lowercase.
    high_b = models.SmallIntegerField(db_column='high_B', blank=True, null=True)  # Field name made lowercase.
    boronize_overnight = models.SmallIntegerField(blank=True, null=True)
    boronize_shots = models.SmallIntegerField(blank=True, null=True)
    comment = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Miniproposals'


class Operator(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    first_shot = models.IntegerField()
    last_shot = models.IntegerField()
    run = models.IntegerField(blank=True, null=True)
    job = models.CharField(max_length=2)
    active = models.BooleanField()
    brief = models.CharField(max_length=256, blank=True, null=True)
    mp = models.IntegerField(blank=True, null=True)
    guid = models.CharField(db_column='GUID', max_length=36, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Operators'

class Preference(models.Model):
    username = models.ForeignKey(User, db_column='username',related_name='preferences')
    application = models.CharField(max_length=30)
    item = models.CharField(max_length=50)
    value = models.CharField(max_length=1000)
    id = models.CharField(db_column='GUID', max_length=36, primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PREFERENCES'


class Run(models.Model):
    username = models.CharField(db_column='USERNAME', max_length=31)  # Field name made lowercase.
    entered = models.DateTimeField(db_column='ENTERED')  # Field name made lowercase.
    run = models.IntegerField(db_column='RUN')  # Field name made lowercase.
    brief = models.CharField(db_column='BRIEF', max_length=72, blank=True, null=True)  # Field name made lowercase.
    dbkey = models.IntegerField(db_column='DBKEY')  # Field name made lowercase.
    id = models.CharField(db_column='GUID', max_length=36, primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'RUNS'


class Shot(models.Model):
    username = models.CharField(db_column='USERNAME', max_length=31)  # Field name made lowercase.
    entered = models.DateTimeField(db_column='ENTERED')  # Field name made lowercase.
    run = models.IntegerField(db_column='RUN')  # Field name made lowercase.
    shot = models.IntegerField(db_column='SHOT')  # Field name made lowercase.
    brief = models.CharField(db_column='BRIEF', max_length=72, blank=True, null=True)  # Field name made lowercase.
    plasma_shot = models.CharField(db_column='PLASMA_SHOT', max_length=1, blank=True, null=True)  # Field name made lowercase.
    quality_comment = models.CharField(db_column='QUALITY_COMMENT', max_length=72, blank=True, null=True)  # Field name made lowercase.
    shot_ok = models.SmallIntegerField(db_column='SHOT_OK', blank=True, null=True)  # Field name made lowercase.
    total_uncompressed_size = models.FloatField(db_column='TOTAL_UNCOMPRESSED_SIZE', blank=True, null=True)  # Field name made lowercase.
    total_compressed_size = models.FloatField(db_column='TOTAL_COMPRESSED_SIZE', blank=True, null=True)  # Field name made lowercase.
    total_uncompressed_umn = models.FloatField(db_column='TOTAL_UNCOMPRESSED_UMN', blank=True, null=True)  # Field name made lowercase.
    total_compressed_umn = models.FloatField(db_column='TOTAL_COMPRESSED_UMN', blank=True, null=True)  # Field name made lowercase.
    total_uncompressed = models.FloatField(db_column='TOTAL_UNCOMPRESSED', blank=True, null=True)  # Field name made lowercase.
    total_compressed = models.FloatField(db_column='TOTAL_COMPRESSED', blank=True, null=True)  # Field name made lowercase.
    init_time = models.FloatField(db_column='INIT_TIME', blank=True, null=True)  # Field name made lowercase.
    store_time = models.FloatField(db_column='STORE_TIME', blank=True, null=True)  # Field name made lowercase.
    analysis_time = models.FloatField(db_column='ANALYSIS_TIME', blank=True, null=True)  # Field name made lowercase.
    dbkey = models.IntegerField(db_column='DBKEY')  # Field name made lowercase.
    nodata = models.NullBooleanField(db_column='NODATA')  # Field name made lowercase.
    id = models.CharField(db_column='GUID', max_length=36, primary_key=True)  # Field name made loweriase.

    class Meta:
        managed = False
        db_table = 'SHOTS'


class Topic(models.Model):
    username = models.CharField(db_column='USERNAME', max_length=31, blank=True, null=True)  # Field name made lowercase.
    entered = models.DateTimeField(db_column='ENTERED', blank=True, null=True)  # Field name made lowercase.
    topic = models.CharField(db_column='TOPIC', max_length=16)  # Field name made lowercase.
    brief = models.CharField(db_column='BRIEF', max_length=72)  # Field name made lowercase.
    dbkey = models.IntegerField(db_column='DBKEY')  # Field name made lowercase.
    sort_order = models.IntegerField(db_column='SORT_ORDER', blank=True, null=True)  # Field name made lowercase.
    id = models.CharField(db_column='GUID', max_length=36, primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TOPICS'

