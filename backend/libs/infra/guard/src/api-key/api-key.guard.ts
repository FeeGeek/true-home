import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  API_KEY_AUTH_OPTIONS,
  ApiKeyAuthSource,
  ApiKeyAuthStrategy,
} from '@lib/constants/api-key.constant';
import { EVENT_API_KEY_VALIDATED } from '@lib/constants/event-emitter-token.constant';
import { ApiKeyAuthOptions } from '@lib/infra/decorators/api-key.decorator';

import {
  ComplexApiKeyServiceToken,
  SimpleApiKeyServiceToken,
} from './api-key.constants';
import { ApiKeyValidationEvent } from './events/api-key-validation.event';
import {
  IApiKeyService,
  ValidateKeyOptions,
} from './services/api-key.interface';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(SimpleApiKeyServiceToken)
    private readonly simpleApiKeyService: IApiKeyService,
    @Inject(ComplexApiKeyServiceToken)
    private readonly complexApiKeyService: IApiKeyService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authOptions = this.reflector.get<ApiKeyAuthOptions>(
      API_KEY_AUTH_OPTIONS,
      context.getHandler(),
    );
    if (!authOptions) return false;

    const request = context.switchToHttp().getRequest();
    const apiKey =
      authOptions.source === ApiKeyAuthSource.Header
        ? request.headers[authOptions.keyName.toLowerCase()]
        : request.query[authOptions.keyName];

    const service =
      authOptions.strategy === ApiKeyAuthStrategy.SignedRequest
        ? this.complexApiKeyService
        : this.simpleApiKeyService;

    const validateOptions: ValidateKeyOptions = {
      algorithm: request.query['Algorithm'],
      algorithmVersion: request.query['AlgorithmVersion'],
      apiVersion: request.query['ApiVersion'],
      timestamp: request.query['timestamp'],
      nonce: request.query['nonce'],
      signature: request.query['signature'],
      requestParams: { ...request.query, ...request.body },
    };

    try {
      const isValid = await service.validateKey(apiKey, validateOptions);

      this.eventEmitter.emit(
        EVENT_API_KEY_VALIDATED,
        new ApiKeyValidationEvent(apiKey, validateOptions, isValid),
      );

      return isValid;
    } catch (error) {
      this.eventEmitter.emit(
        EVENT_API_KEY_VALIDATED,
        new ApiKeyValidationEvent(apiKey, validateOptions, false),
      );
      return false;
    }
  }
}
