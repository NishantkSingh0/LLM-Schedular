from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import OrgInfo
from .serializers import OrgInfoSerializer

# Wakeup endpoint
@api_view(['GET'])
def wakeup(request):
    print("Wakeup ping received — server is alive!")
    return Response(status=204)

# Login & Data Handling
@api_view(['POST'])
def org_login(request):
    email = request.data.get("email")
    try:
        org = OrgInfo.objects.get(Email=email)
        serializer = OrgInfoSerializer(org)
        return Response({"status": "exists", "data": serializer.data})
    except OrgInfo.DoesNotExist:
        return Response({"status": "not_found"})

# Create New OrgRecord
@api_view(['POST'])
def create_org(request):
    serializer = OrgInfoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"status": "created", "data": serializer.data})
    return Response(serializer.errors, status=400)

# Tokens Handling
@api_view(['POST'])
def update_tokens(request):
    email = request.data.get("email")
    tokens = request.data.get("tokens")  # can be + or -
    try:
        org = OrgInfo.objects.get(Email=email)
        org.Tokens += int(tokens)
        org.save()
        return Response({"status": "updated", "tokens": org.Tokens})
    except OrgInfo.DoesNotExist:
        return Response({"error": "Org not found"}, status=404)
    
# Update Candidate Records
@api_view(['POST'])
def update_batch(request):
    email = request.data.get("email")
    batch_data = request.data.get("BatchesStack")

    try:
        org = OrgInfo.objects.get(Email=email)
        if batch_data:
            if not org.BatchesStack:
                org.BatchesStack = batch_data
            else:
                org.BatchesStack.CandNames.extend(batch_data.get("CandNames", []))
                org.BatchesStack.CandScores.extend(batch_data.get("CandScores", []))
                org.BatchesStack.ResumeInfos.extend(batch_data.get("ResumeInfos", []))
            org.save()
        return Response({"status": "batch_updated"})
    except OrgInfo.DoesNotExist:
        return Response({"error": "Org not found"}, status=404)