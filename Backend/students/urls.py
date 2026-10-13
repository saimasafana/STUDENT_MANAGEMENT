from django.urls import path
from .views import StudentAPI,StudentDetailAPI

urlpatterns=[
    path('students/',StudentAPI.as_view(),name="student-list"),
    path('students/<int:pk>/',StudentDetailAPI.as_view(),name="student-detail")
]