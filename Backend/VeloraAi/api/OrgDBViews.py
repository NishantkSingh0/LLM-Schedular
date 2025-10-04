# API/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .mongo_client import org_collection
from .serializers import OrgInfoSerializer

# Check if organization exists
@api_view(['POST'])
def get_org(request):
    email = request.data.get("email")
    org = org_collection.find_one({"Email": email}, {"_id": 0})
    if org:
        return Response({"status": "exists", "data": org})
    return Response({"status": "not_found"})

# Create new organization record
@api_view(['POST'])
def create_org(request):
    serializer = OrgInfoSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        if org_collection.find_one({"Email": data["Email"]}):
            return Response({"status": "exists"}, status=200)
        org_collection.insert_one(data)
        return Response({"status": "created"}, status=201)
    return Response(serializer.errors, status=400)

# Update token count (+ or -)
@api_view(['PUT'])
def update_tokens(request):
    email = request.data.get("email")
    tokens = int(request.data.get("tokens", 0))
    result = org_collection.update_one(
        {"Email": email},
        {"$inc": {"Tokens": tokens}}
    )
    if result.matched_count:
        org = org_collection.find_one({"Email": email}, {"_id": 0})
        return Response({"status": "updated", "tokens": org["Tokens"]})
    return Response({"error": "Org not found"}, status=404)

# Update candidate records (lists: CandNames, CandScores, ResumeInfos)
@api_view(['PUT'])
def update_batch(request):
    email = request.data.get("email")
    batch_data = {
        "CandNames": request.data.get("CandNames", []),
        "CandScores": request.data.get("CandScores", []),
        "ResumeInfos": request.data.get("ResumeInfos", [])
    }

    # Use $push with $each to append arrays in MongoDB
    result = org_collection.update_one(
        {"Email": email},
        {
            "$push": {
                "CandNames": {"$each": batch_data["CandNames"]},
                "CandScores": {"$each": batch_data["CandScores"]},
                "ResumeInfos": {"$each": batch_data["ResumeInfos"]}
            }
        }
    )

    if result.matched_count:
        return Response({"status": "batch_updated"})
    return Response({"error": "Org not found"}, status=404)
