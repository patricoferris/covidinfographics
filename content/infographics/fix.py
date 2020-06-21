from os import walk, rename
import json
f = []
# for (dirpath, dirnames, filenames) in walk("./School Advice"):
#   path = dirpath.split("/")
#   if len(path) > 3:
#     if dirpath.split("/")[3] == "9. School FAQ 6":
#       print(dirpath, dirnames, filenames[0])
#       rename(dirpath + "/" + filenames[0], dirpath + "/" + "age_group.png") 
#   f.extend(filenames)
#   d.extend(dirnames)

d = {} 

s = """
{
  "pages": {
    "home": "Home",
    "about": "About us",
    "partners": "Partners",
    "media": "Media",
    "involved": "Get Involved"
  },
  "index": {
    "missionTitle": "Our Mission",
    "mission": "As a group of doctors, medical students and volunteers, we’ve created infographics to help summarise key points about COVID-19 in a variety of languages to get the right information, in an easy to understand format, to these communities.",
    "stepOneTitle": "Step 1",
    "stepOne": "First, select your preferred language.",
    "stepTwoTitle": "Step 2",
    "stepTwo": "View or download infographics from the list below by clicking either of the two options.",
    "wellBeing": "Well-Being",
    "wellBeingText": "We have created a list of all the services offering support to BAME groups in each region of the UK.",
    "wellBeingLink": "Click here to find one near you."
  },
  "resources": {
    "placeholder": "Resources coming soon..."
  }
}
"""

for (dirpath, dirnames, filenames) in walk("."):
  for dir in dirnames: 
    with open("../../config/translations/" + dir + ".json", "w+") as f: 
      f.write(s)
  break