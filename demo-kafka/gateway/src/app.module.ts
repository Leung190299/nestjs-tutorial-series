import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TrackController } from './track.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANALYTICS',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['localhost:9092'] },
        },
      },
    ]),
  ],
  controllers: [TrackController],
})
export class AppModule {}
