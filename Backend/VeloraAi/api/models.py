from djongo import models

class BatchesStack(models.Model):
    CandNames = models.JSONField(default=list)   # store as list of lists
    CandScores = models.JSONField(default=list)
    ResumeInfos = models.JSONField(default=list)

    class Meta:
        abstract = True  # embedded document, not its own collection

class OrgInfo(models.Model):
    Email = models.EmailField(primary_key=True, unique=True)  # search key
    Name = models.CharField(max_length=255)
    Tokens = models.IntegerField(default=0)
    OrgSize = models.CharField(max_length=50)
    BatchesStack = models.EmbeddedField(
        model_container=BatchesStack,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.Email


class InterviewScores(models.Model):
    Scores = models.JSONField(default=list)  # store as list of lists
    OurFeedback = models.TextField(blank=True, null=True)
    ImprovementsNeeded = models.TextField(blank=True, null=True)

    class Meta:
        abstract = True  # embedded document


class Student(models.Model):
    StudentMail = models.EmailField(primary_key=True, unique=True)
    StudentName = models.CharField(max_length=255)
    Tokens = models.IntegerField(default=0)
    ExpectedPosition = models.CharField(max_length=255)
    Designation = models.CharField(max_length=255)
    Resume = models.TextField()

    Scores = models.EmbeddedField(
        model_container=InterviewScores,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.StudentMail
    

# Sample Json for StudentInfo's
# {
#   "StudentMail": "john.doe@gmail.com",
#   "StudentName": "John Doe",
#   "Tokens": 50,
#   "ExpectedPosition": "Backend Developer",
#   "Designation": "Intern",
#   "Resume": "resume_john.pdf",
#   "Scores": {
#     "Scores": [["85", "90"]],
#     "OurFeedback": "Good technical skills",
#     "ImprovementsNeeded": "Improve communication"
#   }
# }


# SampleJson for OrgInfo's
# {
#   "Email": "hr@company.com",
#   "Name": "XYZ Corp",
#   "Tokens": 10,
#   "OrgSize": "Medium",
#   "BatchesStack": {
#     "CandNames": [["Alice", "Bob"]],
#     "CandScores": [["85", "90"]],
#     "ResumeInfos": [["resume1.pdf", "resume2.pdf"]]
#   }
# }
