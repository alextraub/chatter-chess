"""
chatter_chess URL Configuration
"""
from django.urls import path, include

urlpatterns = [
	path('', include('frontend.urls'))
]
