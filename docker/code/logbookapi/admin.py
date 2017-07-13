from django.contrib import admin
from logbookapi.models import Shot,Miniproposal,Operator,Entry,EntryDisplayPref,EntryDisplayTemplate,Preference,Run,Topic,User

# Register your models here.

admin.site.register(Operator)
admin.site.register(Shot)
admin.site.register(Miniproposal)
admin.site.register(Entry)
admin.site.register(EntryDisplayPref)
admin.site.register(EntryDisplayTemplate)
admin.site.register(Preference)
admin.site.register(Run)
admin.site.register(Topic)
admin.site.register(User)
