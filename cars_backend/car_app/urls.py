from django.urls import path
from . import views

urlpatterns = [

path('', views.CarAPIView.as_view(), name='car'),
path('model/', views.CarModelAPIView.as_view(), name='car_model'),

]