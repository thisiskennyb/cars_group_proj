from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CarModel  # Adjust the import path as needed
from .serializers import CarModelSerializer  # Adjust the import path as needed


class CarAPIView(APIView):
    pass



class CarModelAPIView(APIView):
    def get(self, request):
        try:
            coins = CarModel.objects.all()  # Use .all() to retrieve all coins
            # Serialize the coin data
            serializer = CarModelSerializer(coins, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except CarModel.DoesNotExist:
            return Response({'message': 'Cars not found.'}, status=status.HTTP_404_NOT_FOUND)