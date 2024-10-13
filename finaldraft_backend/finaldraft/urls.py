from django.urls import path
from . import views 


urlpatterns = [
	path('users/assignments/', views.AssignmentViewSet.as_view() , name='assignment'),
]