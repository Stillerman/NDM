from logbookapi.models import Shot,Topic,Miniproposal,Operator,Entry,EntryDisplayPref,EntryDisplayTemplate,Preference,Run,User
import json

from rest_framework import serializers

class ShotSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=Shot
        fields = '__all__'

class MiniproposalSerializer(serializers.HyperlinkedModelSerializer):
    guid = serializers.ReadOnlyField()

    class Meta:
        model=Miniproposal
        fields = '__all__'

class OperatorSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=Operator
        fields = '__all__'

class EntrySerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.UUIDField(read_only=True)
    dbkey = serializers.IntegerField(read_only=True)
    entered = serializers.DateTimeField(read_only=True)

    username = serializers.CharField()
    voided = serializers.DateTimeField(allow_null=True, required=False)
    run = serializers.IntegerField(required=False)
    shot = serializers.IntegerField(required=False)
    topic = serializers.CharField()
    text = serializers.CharField()

    class Meta:
        model=Entry
        fields = '__all__'

class EntryDisplayPrefSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=EntryDisplayPref
        fields = '__all__'

class EntryDisplayTemplateSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=EntryDisplayTemplate
        fields = '__all__'

class PreferenceSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=Preference
        fields = '__all__'

class RunSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=Run
        fields = '__all__'

class UserSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=User
        fields = '__all__'

class TopicSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model=Topic
        fields = '__all__'

