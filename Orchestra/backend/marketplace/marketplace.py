import requests
from flask import Flask
from flask import request
from flask_cors import CORS
import os
import uuid
import ibm_boto3
import sys
from ibm_botocore.client import Config, ClientError
from werkzeug.utils import secure_filename
from pymongo import MongoClient, TEXT
from bson.json_util import dumps
from bson.json_util import loads

cluster = MongoClient("mongodb+srv://marketplace:marketplace@cluster18630.3wlh3.mongodb.net/?retryWrites=true&w=majority")
db = cluster["marketplace"]
bot_collection = db["bots"]
review_collection = db["reviews"]

dl_link = "https://orchestra-store-microservice.s3.us-east.cloud-object-storage.appdomain.cloud/"

app = Flask(__name__)

CORS(app)

user_device_addToBots = 'http://127.0.0.1:3003/api/devices/addToBots'

dispatcher_refresh_applist = "http://127.0.0.1:3005/dispatch/refresh-applet-list"

config = {
    "apikey": "_Z8L-OX6qYySkHozSrzOALgyTYLzqjbL0K6zYcZNR2dE",
    "endpoints": "https://s3.us-east.cloud-object-storage.appdomain.cloud",
    "iam_apikey_description": "Auto-generated for key crn:v1:bluemix:public:cloud-object-storage:global:a/02c1628a91ee4acb9bf7eac5136647df:e5b80be6-b9e3-4506-a03c-8ec116f1bd51:resource-key:08bae43f-d99d-4720-8746-e12f9b1b3d58",
    "iam_apikey_name": "orchestra-store-microservice",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/02c1628a91ee4acb9bf7eac5136647df::serviceid:ServiceId-ed655772-d31a-43f2-bdd1-aa79b8d24ce8",
    "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/02c1628a91ee4acb9bf7eac5136647df:e5b80be6-b9e3-4506-a03c-8ec116f1bd51::"
}


cos = ibm_boto3.resource("s3",
    ibm_api_key_id=config["apikey"],
    ibm_service_instance_id="e5b80be6-b9e3-4506-a03c-8ec116f1bd51",
    config=Config(signature_version="oauth"),
    endpoint_url=config["endpoints"]
)

BUCKET_NAME = "orchestra-store-microservice"

bot_collection.create_index([('name', TEXT)], default_language='english')

def upload_file(bucket_name, item_name, file_path):
    try:
        print("Starting file transfer for {0} to bucket: {1}\n".format(item_name, bucket_name))
        # set 5 MB chunks
        part_size = 1024 * 1024 * 5

        # set threadhold to 15 MB
        file_threshold = 1024 * 1024 * 15

        # set the transfer threshold and chunk size
        transfer_config = ibm_boto3.s3.transfer.TransferConfig(
            multipart_threshold=file_threshold,
            multipart_chunksize=part_size
        )

        # the upload_fileobj method will automatically execute a multi-part upload
        # in 5 MB chunks for all files over 15 MB
        with open(file_path, "rb") as file_data:
            cos.Object(bucket_name, item_name).upload_fileobj(
                Fileobj=file_data,
                Config=transfer_config
            )

        print("Transfer for {0} Complete!\n".format(item_name))
    except ClientError as be:
        print("CLIENT ERROR: {0}\n".format(be))
    except Exception as e:
        print("Unable to complete multi-part upload: {0}".format(e))


def return_uploaded_file_names(bucket_name, enable_debug=0):
    if(enable_debug):
        print("Retrieving bucket contents from: {0}".format(bucket_name))
    file_names = []
    try:
        files = cos.Bucket(bucket_name).objects.all()
        for file in files:
            file_names.append(file.key)
            if(enable_debug):
                print("Item: {0} ({1} bytes).".format(file.key, file.size))
    except ClientError as be:
        print("CLIENT ERROR: {0}\n".format(be))
    except Exception as e:
        print("Unable to retrieve bucket contents: {0}".format(e))
    return file_names


def delete_item(bucket_name, object_name):
    try:
        cos.delete_object(Bucket=bucket_name, Key=object_name)
        print("Item: {0} deleted!\n".format(object_name))
    except ClientError as be:
        print("CLIENT ERROR: {0}\n".format(be))
    except Exception as e:
        print("Unable to delete object: {0}".format(e))

@app.route('/upload', methods=["POST"])
def upload():
    buid = str(uuid.uuid4())
    name = request.form.get('name')
    description = request.form.get('description')
    platform = request.form.get('platform')

    """ For debugging """
    original_stdout = sys.stdout
    with open(name + 'metadata', 'w') as f:
        sys.stdout = f 
        print(buid)
        print(name)
        print(description)
        print(platform)
        sys.stdout = original_stdout

    dl_link = "https://orchestra-store-microservice.s3.us-east.cloud-object-storage.appdomain.cloud/"
    
    file = request.files['file']
    if file.filename == "":
        return "<p>Upload failed</p>"
    else:
        filename = secure_filename(file.filename)
        file.save(filename)
        upload_file(BUCKET_NAME, buid+filename, filename)

    bot_collection.insert_one({"buid": buid, "name": name, "description": description, "platform": platform, "og_filename" : filename, "url": dl_link + buid+filename})
    
    return "<p>Upload successful</p>"

@app.route('/reviews/<buid>', methods=["GET"])
def reviews(buid):
    search_results = list(review_collection.find({"buid" : buid}, {"_id" : 0, "buid" : 0}))
    results = {"results" : search_results}
    return results

@app.route('/marketplace/<buid>', methods=["GET"])
def get_bot(buid):
    result = bot_collection.find_one({"buid" : buid}, {"_id": 0})
    return loads(dumps(result))

@app.route('/reviews/submit', methods=["POST"])
def submit_review():
    content = request.get_json(force=True)
    buid = content["buid"]
    username = content["username"]
    comments = content["comments"]
    rating = content["rating"]
    review_collection.insert_one({"buid": buid, "username": username, "comments": comments, "rating": rating})
    return "<p>review submitted</p>"
    
@app.route('/marketplace/download', methods=["POST"])
def download():
    content = request.get_json(force=True)
    print(content, file=sys.stderr)
    if(content is None):
        return "<p>Failed, empty payload</p>"
    userId = content["userid"]
    deviceId = content["deviceid"]
    buid = content["buid"]
    botname = content["botname"]
    
    addToBotsPayload = {'userId': userId, 'deviceId': deviceId, 'buid': buid, 'botname': botname} 
    print("Pre-post", file=sys.stderr)
    addToBotsResponse = requests.post(user_device_addToBots, json=addToBotsPayload)
    print(addToBotsResponse.json(), file=sys.stderr)

    refreshAppListPayload = {"device_id": deviceId, "user_id": userId}
    requests.post(dispatcher_refresh_applist, json=refreshAppListPayload)
    
    return addToBotsResponse.json()

@app.route('/get_metadata/<buid>', methods=["GET"])
def get_metadata(buid):
    result = bot_collection.find_one({"buid" : buid}, {"_id" : 0, "og_filename" : 1, "url": 1})
    return loads(dumps(result))

@app.route('/get_bots', methods=["POST"])
def get_bot_page():
    content = request.get_json(force=True)
    page = content["page"]
    results = list(bot_collection.find({}, {"_id":0}).skip(3*int(page)).limit(3))
    return {"results" : results}

@app.route('/search_bots', methods=["POST"])
def search_bots():
    content = request.get_json(force=True)
    searchterm = content["searchterm"]
    results = list(bot_collection.find({"$text": {"$search":searchterm}}, {"_id":0}))
    return {"results" : results}

if __name__ == '__main__':
    app.run(port=5008)
