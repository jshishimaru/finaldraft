import os
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status
from finaldraft.models import Assignment, Subtask, Submission, Attachment
from finaldraft.serializers.submission import SubmissionCreateSerializer, SubtaskSubmissionInfoSerializer, SubmissionListSerializer

@method_decorator(csrf_exempt, name='dispatch')
class SubmissionViewSet(View):

	def post(self,request):
		data = JSONParser().parse(request)
		assignment= get_object_or_404(Assignment, pk=data.get('assignment_id'))
		subtask_list = []
		reviewer_list = list(data.get('reviewer_ids'))
		reviewee_list = list(data.get('reviewee_ids'))
		for subtask_id in data.get('subtask_ids'):
			subtask = get_object_or_404(Subtask, pk=subtask_id)
			subtask_list.append(subtask)
		
		submission_data = {
			'date': data.get('date'),
			'assignment': assignment.id,
			'remark': data.get('remark'),	
			'repo_link': data.get('repo_link'),		
		}
		serializer = SubmissionCreateSerializer(data=submission_data)
		if serializer.is_valid():
			submission = serializer.save(assignment=assignment)
			submission.reviewee.add(*reviewee_list)
			submission.reviewer.add(*reviewer_list)
			for subtask in subtask_list:
				subtask_info_data = {
					'subtask': subtask.id,
					'is_completed': False,
				}
				submission_info_serializer = SubtaskSubmissionInfoSerializer(data=subtask_info_data)
				if submission_info_serializer.is_valid():
					subtask_info = submission_info_serializer.save(subtask=subtask)
					subtask_info.submission = submission
					subtask_info.save()
					return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
@method_decorator(csrf_exempt, name='dispatch')	
class SubmissionEditViewSet(View):

	def post(self,request):
		data = JSONParser().parse(request)
		submission = get_object_or_404(Submission, pk=data.get('submission_id'))
		submission.is_completed = data.get('is_completed')
		completed_subtasks = list(data.get('completed_subtasks'))
		for subtask_id in completed_subtasks:
			subtask = get_object_or_404(Subtask, pk=subtask_id)
			subtask_info = get_object_or_404(submission.subtasksubmissioninfo_set, subtask=subtask)
			subtask_info.is_completed = True
			subtask_info.save()
		submission.save()
		return JsonResponse({'success':'Submission updated'}, status=status.HTTP_200_OK)

class SubmissionListViewSet(View):

	def get(self,request):
		submissions=Submission.objects.filter(assignment=request.GET.get('assignment_id'))
		serializer = SubmissionListSerializer(submissions, many=True)
		return JsonResponse(serializer.data, safe=False)

@method_decorator(csrf_exempt, name='dispatch')
class SubmissionApproveViewSet(View):

	def post(self,request):
		submission = get_object_or_404(Submission, pk=request.POST.get('submission_id'))
		print(submission)
		assignment=submission.assignment
		if request.user not in assignment.reviewer.all():
			return JsonResponse({'error':'You are not allowed to approve this submission'}, status=status.HTTP_403_FORBIDDEN)
		submission.approved_by = request.user
		submission.save()
		return JsonResponse({'success':'Submission approved'}, status=status.HTTP_200_OK)

	

