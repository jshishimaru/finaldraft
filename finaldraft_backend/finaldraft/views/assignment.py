from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.db.models import Q
from finaldraft.models import Assignment, GroupInfo, User , Subtask
from finaldraft.serializers.assignment import AssignmentSerializer
from finaldraft.serializers.subtask import SubtaskSerializer

@method_decorator(csrf_exempt, name='dispatch')
class AssignmentListViewSet(APIView):

	def get( self , request , format=None):
		user = request.user
		assignments = Assignment.objects.filter( Q(reviewee=user) or Q(reviewer=user) )
		serializer = AssignmentSerializer( assignments , many=True )
		return Response(serializer.data)
	
@method_decorator(csrf_exempt, name='dispatch')	
class AssignmentInfoViewSet( View) :

	def get(self, request):
		assignment_id = request.GET.get('assignment_id')
		assignment = get_object_or_404(Assignment, pk=assignment_id)
		serializer = AssignmentSerializer( assignment )
		return JsonResponse(serializer.data)

	@csrf_exempt
	def post(self, request):
		data = JSONParser().parse(request)
		reviewee_groups = data.get('reviewee_groups', [])
		reviewee_users = data.get('reviewee_users', [])
		reviewer_groups = data.get('reviewer_groups', [])
		reviewer_users = data.get('reviewer_users', [])	

		print(reviewee_groups)
		print(reviewer_groups)

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

@method_decorator(csrf_exempt, name='dispatch')
class AssignmentSubtaskListViewSet( View ):

	def get( self , request ):
		assignment = get_object_or_404(Assignment, pk=request.GET.get('assignment_id'))
		subtasks = Subtask.objects.filter(assignment=assignment)
		serializer = SubtaskSerializer( subtasks , many=True )
		return JsonResponse(serializer.data, safe=False)
	
	def post(self, request):
		data = JSONParser().parse(request)
		assignment = get_object_or_404(Assignment, pk=data.get('assignment_id'))
		subtask_data = {
			'title': data.get('title'),
			'date': data.get('date'),
			'deadline': data.get('deadline'),
			'assignment': assignment.id,
		}
		serializer = SubtaskSerializer(data=subtask_data)
		if serializer.is_valid():
			subtask = serializer.save(assignment=assignment)
			return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
