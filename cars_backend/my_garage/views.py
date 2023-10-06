from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import UserProfile
from car_app.models import CarModel
from .serializers import CarSerializer


class MyGarageAPIView(APIView):
    def get(self, request):
        user = request.user  # Get the currently logged-in user
        
        try:
            profile = UserProfile.objects.get(user=user)
            my_garage_cars = profile.my_garage.all()  # Retrieve the user's cars from garage

            # Serialize the watchlist movies data
            serializer = CarSerializer(my_garage_cars, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    
    def post(self, request):
        year = request.data.get('year')
        make = request.data.get('make')
        model = request.data.get('model')
        option = request.data.get('option')
        user = request.user
    

        try:
            profile = UserProfile.objects.get(user=user)
            if not profile.my_garage.filter(option=option).exists():
                car = CarModel.objects.create(make=make, model=model, option=option, year=year)
                profile.my_garage.add(car)
                return Response({'message': 'Car added.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Car already in garage.'}, status=status.HTTP_200_OK)

        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
