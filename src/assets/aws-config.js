// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
const aws_app_analytics = "enable";
const aws_cognito_identity_pool_id = "us-west-2:e9e50a5b-434d-47fc-84a7-710ab2e0b93a";
const aws_cognito_region = "us-west-2";
const aws_content_delivery = "enable";
const aws_content_delivery_bucket = "appositran-hosting-mobilehub-1284814296";
const aws_content_delivery_bucket_region = "us-west-2";
const aws_content_delivery_cloudfront = "enable";
const aws_content_delivery_cloudfront_domain = "d687d1b09li8u.cloudfront.net";
const aws_dynamodb = "enable";
const aws_dynamodb_all_tables_region = "us-west-2";
const aws_dynamodb_table_schemas =
[{"tableName":"appositran-mobilehub-1284814296-aeropuertos","attributes":[{"name":"idATO","type":"S"},{"name":"correlativo","type":"N"},{"name":"idCodigo","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idATO"},{"tableName":"appositran-mobilehub-1284814296-modulo1","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo7","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo11","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-inspecciones","attributes":[{"name":"idATO","type":"S"},{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idATO","rangeKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo6","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo9","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo8","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo10","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo3","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"ionic-mobile-hub-tasks","attributes":[{"name":"userId","type":"S"},{"name":"taskId","type":"S"},{"name":"category","type":"S"},{"name":"created","type":"N"},{"name":"description","type":"S"}],"indexes":[{"indexName":"DateSorted","hashKey":"userId","rangeKey":"created"}],"region":"us-west-2","hashKey":"userId","rangeKey":"taskId"},{"tableName":"appositran-mobilehub-1284814296-modulo2","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo5","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"},{"tableName":"appositran-mobilehub-1284814296-modulo4","attributes":[{"name":"idInspeccion","type":"S"}],"indexes":[],"region":"us-west-2","hashKey":"idInspeccion"}];
const aws_mobile_analytics_app_id = "76e860d8097d4483811ae02ac8c32455";
const aws_project_id = "5fcb6020-30f0-4d7b-b390-1655d4942e5f";
const aws_project_name = "appOsitran";
const aws_project_region = "us-west-2";
const aws_resource_name_prefix = "appositran-mobilehub-1284814296";
const aws_sign_in_enabled = "enable";
const aws_user_files = "enable";
const aws_user_files_s3_bucket = "appositran-userfiles-mobilehub-1284814296";
const aws_user_files_s3_bucket_region = "us-west-2";
const aws_user_pools = "enable";
const aws_user_pools_id = "us-west-2_daTJLtYsG";
const aws_user_pools_mfa_type = "OFF";
const aws_user_pools_web_client_id = "698v0jcla9u2tkjnitmm0pvf26";
const aws_user_settings = "enable";

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: aws_cognito_identity_pool_id
}, {
    region: aws_cognito_region
  });
AWS.config.update({ customUserAgent: 'MobileHub v0.1' });
