from django.db import models
import datetime


# Create your models here.
class Role(models.Model):
	name = models.CharField(max_length=50)

	def __str__(self):
		return self.name

class User(models.Model):
	enrollment_no = models.CharField(max_length=50)
	name = models.CharField(max_length=50)
	email = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	role = models.ForeignKey(Role, on_delete=models.CASCADE)

	def __str(self):
		return self.name

class Assignment(models.Model):
	title = models.CharField(max_length=50)
	date = models.DateField( default=datetime.date.today)
	deadline = models.DateField()
	description = models.CharField(max_length=50)
	creator = models.ForeignKey(User, on_delete=models.CASCADE)
	reviewer = models.ManyToManyField(User)
	reviewee = models.ManyToManyField(User)

	def __str__(self):
		return self.title

class Subtask( models.Model):
	title = models.CharField(max_length=200)
	date = models.DateField( default=datetime.date.today)
	deadline = models.DateField()
	assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Submission( models.Model):
	remark = models.CharField(max_length=200)
	date = models.DateField( default=datetime.date.today)	
	reviewee = models.ManyToManyField(User)
	reviewer = models.ManyToManyField(User)
	approved_by = models.ForeignKey(User, on_delete=models.CASCADE)
	is_completed = models.BooleanField()
	iteration_no = models.IntegerField( )
	assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)


class Attachment(models.Model):
	ATTACHMENT_TYPES = [
		('URL', 'URL'),
		('PDF', 'PDF'),
		('IMAGE', 'Image'),
	]

	type = models.CharField(max_length=50, choices=ATTACHMENT_TYPES)
	url = models.URLFieldField(blank=True , null=True)
	assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
	submission = models.ForeignKey(Submission, on_delete=models.CASCADE)


class SubtaskInfo(models.Model):
	subtask = models.ForeignKey(Subtask, on_delete=models.CASCADE)
	submission = models.ForeignKey(Submission, on_delete=models.CASCADE) 
	iteration_no = models.IntegerField()
	is_completed = models.BooleanField()

