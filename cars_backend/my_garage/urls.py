from django.urls import path
from . import views

urlpatterns = [

path('', views.MyGarageAPIView.as_view(), name='garage'),
]