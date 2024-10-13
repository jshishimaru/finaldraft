from django.urls import path
from . import views 


urlpatterns = [
	path('users/assignments/', views.AssignmentListViewSet.as_view() , name='assignment'),
]