from django.db import models
import datetime


# Create your models here.
class Role(models.Model):
	role_name = models.CharField(max_length=50)

class User(models.Model):
	enrollment_no = models.CharField(max_length=50)
	name = models.CharField(max_length=50)
	email = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	role = models.ForeignKey(Role, on_delete=models.CASCADE)

class Assignment(models.Model):
	title = models.CharField(max_length=50)
	date = models.DateField( default=datetime.date.today)
	deadline = models.DateField()
	description = models.CharField(max_length=50)
	creator = models.ForeignKey(User, on_delete=models.CASCADE)
	reviewer = models.ManyToManyField(User)
	reviewee = models.ManyToManyField(User)

class Subtask( models.Model):
	subtask_title = models.CharField(max_length=200)
	subtask_date = models.DateField( default=datetime.date.today)
	subtask_deadline = models.DateField()
	subtask_assignment_id = models.ForeignKey(Assignment, on_delete=models.CASCADE)

class Submission( models.Model):
	submission_remark = models.CharField(max_length=200)
	submission_date = models.DateField( default=datetime.date.today)	
	submission_reviewee_id = models.ManyToManyField(User)
	submission_reviewer_id = models.ManyToManyField(User)
	submission_approved_by = models.ForeignKey(User, on_delete=models.CASCADE)
	submission_is_completed = models.BooleanField()
	submission_iteration_no = models.IntegerField( )
	assignment_id = models.ForeignKey(Assignment, on_delete=models.CASCADE)

class Attachment(models.Model):
	ATTACHMENT_TYPES = [
		('URL', 'URL'),
		('PDF', 'PDF'),
		('IMAGE', 'Image'),
	]

	attachment_type = models.CharField(max_length=50, choices=ATTACHMENT_TYPES)
	attachment_url = models.CharField(max_length=50)
	assignment_id = models.ForeignKey(Assignment, on_delete=models.CASCADE)
	submission_id = models.ForeignKey(Submission, on_delete=models.CASCADE)

class Subtask_Info(models.Model):
	subtask_id = models.ForeignKey(Subtask, on_delete=models.CASCADE)
	submission_id = models.ForeignKey(Submission, on_delete=models.CASCADE) 
	subtask_iteration_no = models.IntegerField()
	subtask_is_completed = models.BooleanField()

