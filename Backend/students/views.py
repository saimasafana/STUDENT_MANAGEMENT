from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
# Create your views here.
class StudentAPI(APIView):
    def get(self,request):
        students=Student.objects.all()
        serializer=StudentSerializer(students,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer=StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class StudentDetailAPI(APIView):
    def get(self,request,pk):
        student=get_object_or_404(Student,pk=pk)
        serializer=StudentSerializer(student)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def put(self,request,pk):
        student=get_object_or_404(Student,pk=pk)
        serializer=StudentSerializer(student,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        print("DELETE METHOD CALLED", pk)

        student = get_object_or_404(Student, pk=pk)
        student.delete()

        return Response(
            {"message": "Student deleted successfully"},
            status=status.HTTP_200_OK
        )


        
