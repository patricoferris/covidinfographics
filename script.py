#!/usr/bin/python3
import os
import json
from shutil import move

SCHOOL_ADVICE = "School Advice"
LANGUAGES = "Languages"
LOCAL_RESOURCES = "local_resources"
rootDir = "graphics"

ALL_LANGUAGES = []

# Map directory name to a dict
forAutoGen = [LANGUAGES, LOCAL_RESOURCES, SCHOOL_ADVICE]
data = {
    LANGUAGES: [],
    LOCAL_RESOURCES: [],
    SCHOOL_ADVICE: []
}


def checkForPathMisMatch(lan):
    if lan not in ALL_LANGUAGES:
        raise Exception("Same name expected for " + lan + "in Language folder")


def renameToPng(path):
    rt = path
    if path.endswith("PNG"):
        striped = os.path.splitext(path)[0]
        move(striped + ".PNG", striped + ".png")
        print("renamed file ", path)
        rt = striped + ".png"
    split = list(os.path.split(rt))
    orgFile = split[-1]
    striped = split[-1].replace(" ", "")
    split.pop(-1)
    move(os.path.sep.join(split + [orgFile]), os.path.sep.join(split + [striped]))
    return os.path.sep.join(split + [striped])


def convertToSrcPathToLinux(path: str):
    return path.replace(os.path.sep, "/")


def main():
    for paths in forAutoGen:
        toProcPath = os.path.join(rootDir, paths)
        for lvl1Dir in os.listdir(toProcPath):
            if paths == LANGUAGES:
                ALL_LANGUAGES.append(lvl1Dir)
            if paths == SCHOOL_ADVICE:
                checkForPathMisMatch(lvl1Dir)
            entry = {"language": lvl1Dir, "graphics": []}
            for lvl2Dir in os.listdir(os.path.join(toProcPath, lvl1Dir)):
                dirOrFilePath = os.path.join(toProcPath, lvl1Dir, lvl2Dir)
                if os.path.isdir(dirOrFilePath):
                    for file in os.listdir(dirOrFilePath):
                        if (len(os.listdir(dirOrFilePath))) > 1:
                            raise Exception("Too many files in dir " + dirOrFilePath)
                        if file.endswith("png"):
                            entry["graphics"].append(
                                {"info": {"name": str.title(lvl2Dir),
                                          "src": convertToSrcPathToLinux(os.path.join(dirOrFilePath, file))}})
                        elif file.endswith("PNG"):
                            reNamed = renameToPng(os.path.join(dirOrFilePath, file))
                            entry["graphics"].append(
                                {"info": {"name": str.title(lvl2Dir), "src": convertToSrcPathToLinux(reNamed)}})
            if len(entry["graphics"]) != 0:
                data[paths].append(entry)

    t = sorted(data["Languages"], key=lambda k: k['language'])
    data["Languages"] = t
    print(json.dumps(data))


if __name__ == "__main__":
    main()
