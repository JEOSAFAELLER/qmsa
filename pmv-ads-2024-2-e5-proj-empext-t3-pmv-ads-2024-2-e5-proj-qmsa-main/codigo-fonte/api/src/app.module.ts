import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { TimestampModule } from './timeStamp/timeStamp.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    TimestampModule,
    ActivitiesModule,
  ],
})
export class AppModule {}
