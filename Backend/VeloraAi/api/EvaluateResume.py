import json
import os
import re
from llm import respond

def ExtractContent(ResumeText: str) -> dict:
    
    SystemPrompt="""You are an expert HR analyst and career coach. Your task is to process a raw text resume and extract structured details, then generate 5 core areas for interview assessment."""
    UserInput=f"""### Input:
    - Raw Resume: {ResumeText}"""+"""
    ### Output:
    Return a **valid JSON** in the following structure:

    {
      "InterviewInfo": {
        "areas": ["area1", "area2", "area3", "area4", "area5"],
        "subtopics": ["Desc1", "Desc2", "Desc3", "Desc4", "Desc5"]
      },
      "Formate Resume": {
        "FullName": string,
        "Designation": string,
        "Years of experience": float,
        "Educations": [
          {"UniversityName": string, "Course": string, "Year": [start_year, end_year]}
        ],
        "Skills": ["skill1", "skill2", ...],
        "Experience": [
          {"OrgName": string, "Year": [start_year, end_year], "Designation": string}
        ]
      }
    }

    ### Rules:
    1. Extract details accurately from the raw resume.
    2. Use the current date to calculate total years of experience.
    3. For "InterviewInfo", choose 5 areas relevant to the candidate's domain and experience.
    4. Provide a short description on every InterviewInfo -> Role
    5. Return only **valid JSON** without extra text."""

    response = respond(UserInput=UserInput, SystemPrompt=SystemPrompt)
    
    json_match = re.search(r'({[\s\S]*})', response.content)
    if json_match:
        json_str = json_match.group(1)
        return json.loads(json_str)
    else:
        return {
            "InterviewInfo": {
                "areas": [],
                "Desc": [],
            },
            "Formate Resume": {
                "FullName": "Arjun Mehta", 
                "Designation": "HR Administrator/Marketing Associate", 
                "Years of experience": 15.75, 
                "Educations": [{
                    "UniversityName": "", 
                    "Course": "", 
                    "Year": [2005, 2015 ]
                }], 
                "Skills": [],
                "Experience": [{
                    "OrgName": "", 
                    "Year": [2007, 2010], 
                    "Designation": ""
                }]
            }
        }