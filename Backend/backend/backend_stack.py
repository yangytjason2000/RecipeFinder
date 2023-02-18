from aws_cdk import (
    Stack,
    aws_dynamodb as dynamodb,
    aws_lambda,
    aws_apigateway as apigw
)
from constructs import Construct

class BackendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        ingredient_table = dynamodb.Table(
            self, "ingredient",
            table_name="ingredient",
            partition_key=dynamodb.Attribute(
                name="name",
                type=dynamodb.AttributeType.STRING
            )
        )

        get_ingredient_lambda = aws_lambda.Function(
            self, 'ingredient_lambda',
            function_name='ingredient_lambda',
            runtime=aws_lambda.Runtime.PYTHON_3_9,
            handler='lambda_function.lambda_handler',
            code=aws_lambda.Code.from_asset('./lambda')
        )

        ingredient_table.grant_read_write_data(get_ingredient_lambda)

        api = apigw.RestApi(
            self, 'Recipe Finder API',
            rest_api_name='Recipe Finder API'
        )
        get_ingredient_lambda_integration = apigw.LambdaIntegration(get_ingredient_lambda, proxy=True)
        resource = api.root.add_proxy(default_integration=get_ingredient_lambda_integration)
