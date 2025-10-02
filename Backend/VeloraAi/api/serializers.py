from rest_framework import serializers
from .models import OrgInfo, BatchesStack, Student, InterviewScores


class BatchesStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchesStack
        fields = ['CandNames', 'CandScores', 'ResumeInfos']


class InterviewScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewScores
        fields = ['Scores', 'OurFeedback', 'ImprovementsNeeded']


class OrgInfoSerializer(serializers.ModelSerializer):
    BatchesStack = BatchesStackSerializer(required=False)

    class Meta:
        model = OrgInfo
        fields = ['Email', 'Name', 'Tokens', 'OrgSize', 'BatchesStack']


class StudentSerializer(serializers.ModelSerializer):
    Scores = InterviewScoresSerializer(required=False)

    class Meta:
        model = Student
        fields = [
            'StudentMail',
            'StudentName',
            'Tokens',
            'ExpectedPosition',
            'Designation',
            'Resume',
            'Scores'
        ]