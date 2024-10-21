from rest_framework import serializers
from finaldraft.models import Assignment


class AssignmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Assignment
		fields = '__all__'

class AssignmentInfoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Assignment
		fields = [
			'title',
			'date',
			'deadline',
			'description',
			'creator',	
		]