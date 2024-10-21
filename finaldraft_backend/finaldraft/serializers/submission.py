from rest_framework import serializers
from finaldraft.models import Submission, SubtaskSubmissionInfo


class SubmissionCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Submission
		fields = [
			'assignment',
			'remark',
			'is_completed',
		]

class SubtaskSubmissionInfoSerializer(serializers.ModelSerializer):
	class Meta:
		model = SubtaskSubmissionInfo
		fields = [
			'is_completed',
		]

class SubmissionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Submission
		fields = '__all__'

class SubmissionListSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = Submission
		fields = ['id','reviewee','date',]