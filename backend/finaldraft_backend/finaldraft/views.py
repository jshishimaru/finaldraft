from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import generics, viewsets
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib.auth.models import User , Group
from .models import Assignment, Submission , Attachment, Subtask, SubtaskInfo , GroupInfo
from .serializers import AssignmentSerializer, SubmissionSerializer, AttachmentSerializer, SubtaskSerializer, SubtaskInfoSerializer , GroupInfoSerializer
# Create your views here.

class AssignmentViewSet( generics.ListCreateAPIView ):
	queryset = Assignment.objects.all()
	serializer_class = AssignmentSerializer

	# def queryset(self):
	# 	user = self.request.user
	# 	return Assignment.objects.filter( Q(reviewer=user) | Q(reviewee=user))

	# def create(self , request , *args , **kwargs):
	# 	data = request.data
	# 	reviewer_set = data.get('reviewer_set')
	# 	reviewee_set = data.get('reviewee_set')
	# 	group_name_set = data.get('group_name_set')
	# 	reviewers_group = Group.objects.filter(name='reviewers')
	# 	reviewees_group = Group.objects.filter(name='reviewees')
	# 	reviewers = reviewers_group.User_set.all()
	# 	reviewees = reviewees_group.User_set.all()		

	# 	for group_name in group_name_set:
	# 		group = get_object_or_404(Group , name=group_name)	




class SubmissionViewSet( generics.ListCreateAPIView):
	queryset = Submission.objects.all()
	serializer_class = SubmissionSerializer

	def queryset(self):
		assignment_id = self.kwargs.get('assignment_id')
		return Submission.objects.filter(assignment_id=assignment_id)
	 	
class SubtaskInfoViewSet( generics.ListCreateAPIView):
	queryset = SubtaskInfo.objects.all()
	serializer_class = SubtaskInfoSerializer

	def queryset(self):
		submission_id = self.kwargs.get('submission_id')
		return SubtaskInfo.objects.filter(submission_id=submission_id)

class GroupViewSet( generics.ListCreateAPIView):
	queryset = GroupInfo.objects.all()
	serializer_class = GroupInfoSerializer

	def queryset(self):
		user = self.request.user		
		return GroupInfo.objects.filter( Q(user=user) )
	
