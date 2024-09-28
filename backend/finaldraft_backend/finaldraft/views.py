from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import generics, viewsets
from django.db.models import Q
from .models import Assignment, Submission , Attachment, Subtask, SubtaskInfo , GroupInfo
from .serializers import AssignmentSerializer, SubmissionSerializer, AttachmentSerializer, SubtaskSerializer, SubtaskInfoSerializer , GroupInfoSerializer
# Create your views here.

class AssignmentViewSet( generics.ListCreateAPIView):
	queryset = Assignment.objects.all()
	serializer_class = AssignmentSerializer

	def queryset(self):
		user = self.request.user
		return Assignment.objects.filter( Q(reviewer=user) | Q(reviewee=user))

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
	
