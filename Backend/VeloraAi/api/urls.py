from django.urls import path
<<<<<<< HEAD
from . import OrgDBViews, AIViews, StdDBViews

urlpatterns = [
    path('wakeup/', AIViews.wakeup),
    path('tts/', AIViews.tts),
=======
from . import OrgDBViews
from . import StdDBViews
from . import AIViews

urlpatterns = [
    path('wakeup/', AIViews.wakeup),
    path('tts/', AIViews.send_audio),
>>>>>>> 7e64da698368776da5a64e77465c0b35ecdfa7b4
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
