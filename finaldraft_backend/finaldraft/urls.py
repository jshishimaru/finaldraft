from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from finaldraft.views.assignment import AssignmentListViewSet, AssignmentInfoViewSet, AssignmentSubtaskListViewSet
from finaldraft.views.group import GroupListViewSet, GroupMemberListViewSet
from finaldraft.views.submission import SubmissionViewSet, SubmissionListViewSet, SubmissionApproveViewSet
from finaldraft.views.attachment import SubmissionAttachmentList , AttachmentURI , AssignmentAttachmentList

urlpatterns = [
	path('users/assignments/', AssignmentListViewSet.as_view() , name='assignment'),
	path('users/groups/', GroupListViewSet.as_view() , name='group'),
	path('assignment/', AssignmentInfoViewSet.as_view() , name='assignemntInfo'),
	path('group/members/', GroupMemberListViewSet.as_view() , name='groupmembers'),
	path('assignment/subtasks/', AssignmentSubtaskListViewSet.as_view() , name='subtask'),
	path('assignment/users/submissions/', SubmissionViewSet.as_view() , name='submission'),
	path('assignment/submissions/' , SubmissionListViewSet.as_view() , name='submissionlist'),
	path('assignment/submissions/attachments/', SubmissionAttachmentList.as_view() , name='attachment'),
	path('assignment/attachments/', AssignmentAttachmentList.as_view() , name='attachmenturi'),
	path('assignment/submissions/approve/', SubmissionApproveViewSet.as_view() , name='submissionapprove'),
	path('attachments/uri/', AttachmentURI.as_view() , name='attachmenturi'),
]
