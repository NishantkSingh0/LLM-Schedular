from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer

# Create Student
@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"status": "created", "data": serializer.data})
    return Response(serializer.errors, status=400)

# Get Student by email
@api_view(['GET'])
def get_student(request, email):
    try:
        student = Student.objects.get(StudentMail=email)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

# Update Tokens
@api_view(['POST'])
def Update_tokens(request):
    email = request.data.get("email")
    tokens = request.data.get("tokens")
    try:
        student = Student.objects.get(StudentMail=email)
        student.Tokens += int(tokens)
        student.save()
        return Response({"status": "tokens_updated", "tokens": student.Tokens})
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

# Update Scores after Interview
@api_view(['POST'])
def update_scores(request):
    email = request.data.get("email")
    new_scores = request.data.get("Scores")
    feedback = request.data.get("OurFeedback")
    improvements = request.data.get("ImprovementsNeeded")

    try:
        student = Student.objects.get(StudentMail=email)
        if not student.Scores:
            student.Scores = {"Scores": [], "OurFeedback": "", "ImprovementsNeeded": ""}

        student.Scores["Scores"].append(new_scores)
        student.Scores["OurFeedback"] = feedback
        student.Scores["ImprovementsNeeded"] = improvements
        student.save()

        return Response({"status": "scores_updated"})
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)