from rest_framework import serializers
# from .models import OrgInfo, Student
# API/serializers.py

class OrgInfoSerializer(serializers.Serializer):
    Email = serializers.EmailField()
    Name = serializers.CharField(max_length=255)
    Tokens = serializers.IntegerField(default=0)
    OrgSize = serializers.CharField(max_length=50)
    CandNames = serializers.ListField(child=serializers.CharField(), default=list)
    CandScores = serializers.ListField(child=serializers.CharField(), default=list)
    ResumeInfos = serializers.ListField(child=serializers.CharField(), default=list)



class StudentSerializer(serializers.Serializer):
    StudentMail = serializers.EmailField()
    StudentName = serializers.CharField(max_length=255)
    Tokens = serializers.IntegerField(default=0)
    ExpectedPosition = serializers.CharField(max_length=255, allow_blank=True)
    Designation = serializers.CharField(max_length=255, allow_blank=True)
    Resume = serializers.CharField(allow_blank=True)
    Scores = serializers.DictField(child=serializers.ListField(), default=list)
    OurFeedback = serializers.CharField(allow_blank=True, default="")
    ImprovementsNeeded = serializers.CharField(allow_blank=True, default="")


# {
#     "StudentMail" : ""
#     "StudentName" : ""
#     "Tokens" : 0
#     "ExpectedPosition" : ""
#     "Designation" : ""
#     "Resume" : ""
#     "Scores" : []
#     "OurFeedback" : ""
#     "ImprovementsNeeded" : ""
# }