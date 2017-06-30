from graphene_django import DjangoObjectType
import graphene

from logbookapi.models import User as UserModel
from logbookapi.models import Shot as ShotModel
from logbookapi.models import Run as RunModel
from logbookapi.models import Miniproposal as MiniproposalModel
from logbookapi.models import EntryDisplayPref as EntryDisplayPrefModel
from logbookapi.models import Preference as PreferenceModel
from logbookapi.models import Entry as EntryModel

class User(DjangoObjectType):
    class Meta:
        model = UserModel
    def resolve_preferences(self, user, args, info):
        return PreferenceModel.objects.filter(username=self.username)
    def resolve_miniproposals(self, user, args, info):
        return MiniproposalModel.objects.filter(username=self.username)
    def resolve_edprefs(self, user, args, info):
        return EntryDisplayPrefModel.objects.filter(username=self.username)

class Shot(DjangoObjectType):
    class Meta:
        model = ShotModel

class Run(DjangoObjectType):
    class Meta:
        model = RunModel

class Miniproposal(DjangoObjectType):
    class Meta:
        model = MiniproposalModel

class EntryDisplayPref(DjangoObjectType):
    class Meta:
        model = EntryDisplayPrefModel

class Preference(DjangoObjectType):
    class Meta:
        model = PreferenceModel

class Header(graphene.ObjectType):
    name = 'Entry Header'
    description = 'Header of the entry'

    username = graphene.String()
    entered = graphene.types.datetime.DateTime()
    voided = graphene.types.datetime.DateTime()
    run = graphene.Int()
    shot = graphene.Int()
    topic = graphene.String()

class Body(graphene.ObjectType):
    name = 'Entry Body'
    description = 'Body of the entry'

    text = graphene.String()

class Entry(graphene.ObjectType):
    name = 'Entry'
    description = 'A logbok Entry'

    id = graphene.ID()
    header = graphene.Field(Header)

    body = graphene.Field(Body)

    def resolve_body(self, user, args, info):
        return self

    def resolve_header(self, user, args, info):
         return self


class Query(graphene.ObjectType):
    entries = graphene.List(Entry,
                            run=graphene.Int(),
                            shot=graphene.Int(),
                            topic=graphene.String(),
                            username=graphene.String(),
                            max=graphene.Int())

    def resolve_entries(self, args, context, info):

        filter = {}
        run = args.get('run')
        shot = args.get('shot')
        topic = args.get('topic')
        username = args.get('username')
        max = args.get('max') or 30

        if run:
            filter['run'] = run
        if shot:
            filter['shot'] = shot
        if topic:
            filter['topic__in'] = map(str.strip, map(str,topic.split(',')))
        if username:
            filter['username'] = username

        return EntryModel.objects.filter(**filter)[:max]

    entry = graphene.Field(Entry, id=graphene.String())
    def resolve_entry(self, args, context, info):
        id = args.get('id')

        if id is not None:
            return EntryModel.objects.get(pk=id)
        return None

    preferences = graphene.List(Preference, username=graphene.String())

    def resolve_preferences(self, args, context, info):
        username = args.get('username')
        if username is not None:
            return PreferenceModel.objects.filter(username=username)
        return PreferenceModel.objects.all()
    
    users = graphene.List(User)
    user = graphene.Field(User,
                          id=graphene.String(),
                          name=graphene.String())
    shots = graphene.List(Shot, run=graphene.Int())
    shot = graphene.Field(Shot,
                          id=graphene.String(),
                          shot=graphene.Int())
    runs = graphene.List(Run)
    miniproposals = graphene.List(Miniproposal)
    entryDisplayPrefs = graphene.List(EntryDisplayPref, 
                        username=graphene.String())
    entryDisplayPref = graphene.Field(EntryDisplayPref,
                         id=graphene.String())

    def resolve_entryDisplayPrefs(self, args, context, info):
        username = args.get('username')
        if username is not None:
            return EntryDisplayPrefModel.objects.filter(username=username)
        return EntryDisplayPrefModel.objects.all()

    def resolve_entryDisplayPref(self, args, context, info):
        id = args.get('id')
        if id is not None:
            return EntryDisplayPrefModel.objects.get(pk=id)
        return None
    

    @graphene.resolve_only_args
    def resolve_users(self):
        return UserModel.objects.all()

    def resolve_user(self, args, context, info):
        id = args.get('id')
        name = args.get('name')

        if id is not None:
            return UserModel.objects.get(pk=id)

        if name is not None:
            return UserModel.objects.get(username=name)

        return None

    def resolve_shot(self, args, context, info):
        id = args.get('id')
        shot = args.get('shot')

        if id is not None:
            return ShotModel.objects.get(pk=id)

        if shot is not None:
            return ShotModel.objects.get(shot=shot)

        return None

    def resolve_shots(self, args, context, info):
        run = args.get('run')
        if run is not None:
            return ShotModel.objects.filter(run=run)
        return ShotModel.objects.all()

    @graphene.resolve_only_args
    def resolve_runs(self):
        return RunModel.objects.all()

    @graphene.resolve_only_args
    def resolve_miniproposals(self):
        return MiniproposalModel.objects.all()

schema = graphene.Schema(query=Query)

