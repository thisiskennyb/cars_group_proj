from rest_framework import serializers
from car_app.models import CarModel


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model= CarModel
        fields= '__all__'