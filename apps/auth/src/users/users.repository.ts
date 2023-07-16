import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DynamoDBClient, GetItemCommand, QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

@Injectable()
export class UsersRepository {

    private tableName: string;
    private db: DynamoDBClient;

    constructor() {
        this.tableName = 'oink-users';
        this.db = new DynamoDBClient({
            region: 'eu-central-1'
        });
    }


    async getUserByEmail(email: string) {
        let user: object;
       
        try {
            const command = new ScanCommand({
                FilterExpression: "email = :email",
                ExpressionAttributeValues: {
                  ":email": { S: email },
                },
                ProjectionExpression: "PK, email",
                TableName: this.tableName,
              });

            user = await this.db.send(command);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new NotFoundException(`User with email "${email}" not found`);
        }

        return user;
    }
}
