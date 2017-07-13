from logbookapi.models import Shot,Topic,Miniproposal,Operator,Entry,EntryDisplayPref,EntryDisplayTemplate,Preference,Run,User

from rest_framework import serializers

class ShotSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Shot
        fields = '__all__'

class MiniproposalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Miniproposal
        fields = '__all__'

class OperatorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Operator
        fields = '__all__'

class EntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Entry
        fields = '__all__'

class EntryDisplayPrefSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=EntryDisplayPref
        fields = '__all__'

class EntryDisplayTemplateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=EntryDisplayTemplate
        fields = '__all__'

class PreferenceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Preference
        fields = '__all__'

class RunSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Run
        fields = '__all__'

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=User
        fields = '__all__'

class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Topic
        fields = '__all__'

