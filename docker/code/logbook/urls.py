"""logbook URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from rest_framework import routers
from logbookapi import views

from django.contrib import admin
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
import debug_toolbar

router = routers.DefaultRouter()
router.register(r'shots', views.ShotViewSet)
router.register(r'runs', views.RunViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'miniproposals', views.MiniproposalViewSet)
router.register(r'operators', views.OperatorViewSet)
router.register(r'entry', views.EntryViewSet)
router.register(r'entry_display_prefs', views.EntryDisplayPrefViewSet)
router.register(r'entry_display_templates', views.EntryDisplayTemplateViewSet)
router.register(r'preferences', views.PreferenceViewSet)
router.register(r'topics', views.TopicViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^__debug__/', include(debug_toolbar.urls)),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
