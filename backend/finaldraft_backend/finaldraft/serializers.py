from rest_framework import serializers
from .models import Assignment, Submission, Attachment, Subtask, SubtaskInfo , GroupInfo

class AssignmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Assignment
		fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Submission
		fields = '__all__'

class AttachmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Attachment
		fields = '__all__'

class SubtaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Subtask
		fields = '__all__'

class SubtaskInfoSerializer(serializers.ModelSerializer):
	class Meta:
		model = SubtaskInfo
		fields = '__all__' 

class GroupInfoSerializer(serializers.ModelSerializer):
	class Meta:
		model = GroupInfo
		fields = '__all__'
