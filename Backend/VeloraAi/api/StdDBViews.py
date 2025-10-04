# API/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .mongo_client import std_collection
from .serializers import StudentSerializer

# Create Student
@api_view(['POST'])
def create_student(request):
    print("Data Received: ",request.data)
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        if std_collection.find_one({"StudentMail": data["StudentMail"]}):
            return Response({"status": "exists"}, status=200)
        std_collection.insert_one(data)
        return Response({"status": "created", "data": data}, status=201)
    return Response(serializer.errors, status=400)

# Get Student by email
@api_view(['POST'])
def get_student(request):
    # print("Finding Student")
    email = request.data.get("email")
    student = std_collection.find_one({"StudentMail": email}, {"_id": 0})
    # print(student)
    if student:
        return Response({"status": "exists", "data": student})
    return Response({"status": "not_found"})

# Update Tokens
@api_view(['PUT'])
def update_tokens(request):
    email = request.data.get("email")
    tokens = int(request.data.get("tokens", 0))
    result = std_collection.update_one(
        {"StudentMail": email},
        {"$inc": {"Tokens": tokens}}
    )
    if result.matched_count:
        student = std_collection.find_one({"StudentMail": email}, {"_id": 0})
        return Response({"status": "tokens_updated", "tokens": student["Tokens"]})
    return Response({"error": "Student not found"}, status=404)

# Update Scores after Interview
@api_view(['PUT'])
def update_scores(request):
    email = request.data.get("email")
    new_scores = request.data.get("Scores", [])
    feedback = request.data.get("OurFeedback", "")
    improvements = request.data.get("ImprovementsNeeded", "")

    student = std_collection.find_one({"StudentMail": email})
    if not student:
        return Response({"error": "Student not found"}, status=404)

    # Initialize Scores dict if not exists
    if not student.get("Scores"):
        student["Scores"] = {"Scores": [], "OurFeedback": "", "ImprovementsNeeded": ""}

    # Append new data
    student["Scores"]["Scores"].append(new_scores)
    student["Scores"]["OurFeedback"] = feedback
    student["Scores"]["ImprovementsNeeded"] = improvements

    # Update in MongoDB
    std_collection.update_one(
        {"StudentMail": email},
        {"$set": {"Scores": student["Scores"]}}
    )

    return Response({"status": "scores_updated"})