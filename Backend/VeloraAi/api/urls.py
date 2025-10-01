from django.urls import path
from . import OrgDBViews
from . import StdDBViews
from . import AIViews

urlpatterns = [
    path('wakeup/', AIViews.wakeup),
    path('tts/', AIViews.send_audio),
    path('stt/', AIViews.stt),
    path('qns/', AIViews.generate_questions),

    # Organization Database Calls
    path("org-login/", OrgDBViews.org_login),
    path("create-org/", OrgDBViews.create_org),
    path("update-tokens/", OrgDBViews.update_tokens),
    path("update-batch/", OrgDBViews.update_batch),

    # Student Database Calls
    path("create-student/", StdDBViews.create_student),
    path("get-student/", StdDBViews.get_student),
    path("update-student-tokens/", StdDBViews.Update_tokens),
    path("update-student-scores/", StdDBViews.update_scores),
]
