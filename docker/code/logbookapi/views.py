from logbookapi.models import Shot,Topic,Miniproposal,Operator,Entry,EntryDisplayPref,EntryDisplayTemplate,Preference,Run,User
from rest_framework import viewsets
from logbookapi.serializers import ShotSerializer,TopicSerializer,MiniproposalSerializer,OperatorSerializer,EntrySerializer,EntryDisplayPrefSerializer,EntryDisplayTemplateSerializer,PreferenceSerializer,RunSerializer,UserSerializer


class ShotViewSet(viewsets.ModelViewSet):
    queryset = Shot.objects.all().order_by('-shot')
    serializer_class = ShotSerializer

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all().order_by('topic')
    serializer_class = TopicSerializer

class MiniproposalViewSet(viewsets.ModelViewSet):
    queryset = Miniproposal.objects.all().order_by('-id')
    serializer_class = MiniproposalSerializer

class OperatorViewSet(viewsets.ModelViewSet):
    queryset = Operator.objects.all().order_by('-shot')
    serializer_class = OperatorSerializer

class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all().order_by('-entered')
    serializer_class = EntrySerializer

class EntryDisplayPrefViewSet(viewsets.ModelViewSet):
    queryset = EntryDisplayPref.objects.all().order_by('-id')
    serializer_class = EntryDisplayPrefSerializer

class EntryDisplayTemplateViewSet(viewsets.ModelViewSet):
    queryset = EntryDisplayTemplate.objects.all().order_by('-id')
    serializer_class = EntryDisplayTemplateSerializer

class PreferenceViewSet(viewsets.ModelViewSet):
    queryset = Preference.objects.all().order_by('-id')
    serializer_class = PreferenceSerializer

class RunViewSet(viewsets.ModelViewSet):
    queryset = Run.objects.all().order_by('-run')
    serializer_class = RunSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')

    serializer_class = UserSerializer

