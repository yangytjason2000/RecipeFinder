import boto3
import json

METHODS = set(['GET', 'POST'])
TABLES = set(['ingredient'])

def lambda_handler(event, context):

    method = event['httpMethod']
    if method not in METHODS:
        return serialize_invalid_response(f'Unsupported HTTP method: {method}')
    
    table_name = event['path'][1:]
    if table_name not in TABLES:
        return serialize_invalid_response(f'Invalid resource name: {table_name}')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    if method == 'GET':
        return get_item(table)
    if method == 'POST':
        return post_item(table, event['body'])

def get_item(table):
    items = []
    response = table.scan()
    items.extend(response['Items'])
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])
    return serialize_correct_response(items)

def post_item(table, payload):
    valid, item = validate_payload(payload)
    if not valid:
        return serialize_invalid_response('Payload not valid')
    
    if not 'name' in item:
        return serialize_invalid_response('Ingredient name not provided')

    table.put_item(Item=item)
    return serialize_correct_response()

def validate_payload(payload):
    try:
        payload = json.loads(payload)
    except Exception:
        return False, 'Payload not valid'
    return True, payload

def serialize_correct_response(body=None):
    return {
        'statusCode': 200,
        'headers': {},
        'body': json.dumps(body),
        'isBase64Encoded': False
    }

def serialize_invalid_response(message):
    body = {
        'message': message
    }
    return {
        'statusCode': 400,
        'headers': {},
        'body': json.dumps(body),
        'isBase64Encoded': False
    }