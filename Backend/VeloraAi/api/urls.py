from django.urls import path
from . import OrgDBViews, AIViews, StdDBViews

urlpatterns = [
    path('wakeup/', AIViews.wakeup),
    path('tts/', AIViews.tts),
    path('stt/', AIViews.stt),
    path('qns/', AIViews.generate_questions),

    # Organization Database Calls
    path("get-organization/", OrgDBViews.get_org),
    path("create-org/", OrgDBViews.create_org),
    path("update-tokens/", OrgDBViews.update_tokens),
    path("update-batch/", OrgDBViews.update_batch),

    # Student Database Calls
    path("create-student/", StdDBViews.create_student),
    path("get-student/", StdDBViews.get_student),
    path("update-student-tokens/", StdDBViews.update_tokens),
    path("update-student-scores/", StdDBViews.update_scores),
]
