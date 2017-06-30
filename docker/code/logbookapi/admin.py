from django.contrib import admin
from logbookapi.models import Shot,Miniproposal,Operator,Entry,EntryDisplayPref,EntryDisplayTemplate,Preference,Run,Topic,User

# Register your models here.
class ShotAdmin(admin.ModelAdmin):
    pass
class MiniproposalAdmin(admin.ModelAdmin):
    pass
class OperatorAdmin(admin.ModelAdmin):
    pass

admin.site.register(Operator, OperatorAdmin)
admin.site.register(Shot, ShotAdmin)
admin.site.register(Miniproposal, MiniproposalAdmin)
admin.site.register(Entry)
admin.site.register(EntryDisplayPref)
admin.site.register(EntryDisplayTemplate)
admin.site.register(Preference)
admin.site.register(Run)
admin.site.register(Topic)
admin.site.register(User)
