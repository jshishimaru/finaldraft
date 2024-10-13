from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import generics, viewsets
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib.auth.models import User , Group
from .models import Assignment, Submission, Attachment, Subtask, SubtaskInfo, GroupInfo
from rest_framework.parsers import JSONParser
from rest_framework import status
from .serializers import AssignmentSerializer, SubmissionSerializer, AttachmentSerializer, SubtaskSerializer, SubtaskInfoSerializer , GroupInfoSerializer , UserDetailSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class AssignmentListViewSet(View):

	def get( self , request ):
		user = request.user
		assignments = Assignment.objects.filter( Q(reviewee=user) or Q(reviewer=user) )
		serializer = AssignmentSerializer( assignments , many=True )
		print(assignments)
		return JsonResponse( serializer.data , safe=False )
	
	def post(self, request):
		data = JSONParser().parse(request)
		reviewee_groups = data.get('reviewee_groups', [])
		reviewee_users = data.get('reviewee_users', [])
		reviewer_groups = data.get('reviewer_groups', [])
		reviewer_users = data.get('reviewer_users', [])	

		all_user_ids= User.objects.values_list('id', flat=True)
		reviewee_list = []
		reviewer_list = []

		for group_id in reviewee_groups:
			group = get_object_or_404(GroupInfo, pk=group_id)
			user_list=group.member.all()
			reviewee_list.extend(user_list)

		for group_id in reviewer_groups:
			group = get_object_or_404(GroupInfo , pk=group_id)
			user_list=group.member.all()
			reviewer_list.extend(user_list)

		for user_id in reviewee_users:
			user = get_object_or_404(User, pk=user_id)
			reviewee_list.append(user)

		for user_id in reviewer_users:
			user = get_object_or_404(User, pk=user_id)
			reviewer_list.append(user)

		assignment_data = {
			'title': data.get('title'),
			'date': data.get('date'),
			'deadline': data.get('deadline'),
			'description': data.get('description'),
			'creator': request.user.id,
		}

		serializer = AssignmentSerializer(data=assignment_data)
		if serializer.is_valid():
			assignment=serializer.save()
			assignment.reviewee.add(*reviewee_list)
			assignment.reviewer.add(*reviewer_list)
			
			return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupListViewSet( View):
	def get(self, request):
		group_list = []
		group_ids = list(GroupInfo.objects.values_list('id', flat=True))
		for group_id in group_ids:
			group = get_object_or_404(GroupInfo, pk=group_id)
			if( request.user in group.member.all() ):
				group_list.append(group)
		
		serializer = GroupInfoSerializer( group_list , many=True )
		return JsonResponse(serializer.data, safe=False)
	
	def post(self, request):
		data = JSONParser().parse(request)
		group_data = {
			'name': data.get('name'),
		}
		user_ids = data.get('members', [])
		user_list = []
		for user_id in user_ids:
			user = get_object_or_404(User, pk=user_id)
			user_list.append(user)
		serializer = GroupInfoSerializer(data=group_data)
		if serializer.is_valid():
			group = serializer.save()
			group.member.add(*user_list)
			return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GroupMemberListViewSet( View):
	def get( self , request ):
		group= get_object_or_404(GroupInfo, pk=request.GET.get('group_id'))
		member_list = group.member.all()
		serializer = UserDetailSerializer( member_list , many=True )
		return JsonResponse(serializer.data, safe=False)

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
	
