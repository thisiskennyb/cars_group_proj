
from django.db import models
from django.contrib.auth.models import User
from car_app.models import CarModel




#Vendor Models
class UserProfile(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    my_garage = models.ManyToManyField(CarModel, related_name='car_model', blank=True)

    def add_to_garage(self, year, make, model, options):
        if not self.my_garage.filter(options=options).exists():
            car=CarModel.objects.create(year=year, make=make, model=model, options=options)
            self.my_garage.add(car)
            return {'message':'car added to list'}
        else:
            return {'message': 'car already exists'}

   

    def __str__(self):
        return self.user.username