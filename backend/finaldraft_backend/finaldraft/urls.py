from django.urls import path
from . import views 


urlpatterns = [
	path('', views.AssignmentViewSet.as_view() , name='assignment'),
]