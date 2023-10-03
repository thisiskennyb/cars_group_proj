from django.db import models

# Create your models here.
class CarModel(models.Model):
    make = models.CharField()
    model = models.CharField()
