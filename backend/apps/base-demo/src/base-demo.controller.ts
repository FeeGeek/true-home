import { createHash } from 'crypto';
import * as fs from 'fs/promises';

import { Cache, CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { FastifyRequest } from 'fastify';

import { Crypto, CryptoMethod, CryptoDirection } from '@lib/infra/crypto';
import { ApiResponseDoc } from '@lib/infra/decorators/api-result.decorator';
import { Public } from '@lib/infra/decorators/public.decorator';
import { ApiRes } from '@lib/infra/rest/res.response';

import { BaseDemoService } from './base-demo.service';

@Controller()
export class BaseDemoController {
  constructor(
    private readonly baseDemoService: BaseDemoService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Public()
  getHello(): string {
    return this.baseDemoService.getHello();
  }

  @Get('/crypto')
  @Public()
  @Crypto(CryptoMethod.AES, CryptoDirection.ENCRYPT)
  getCrypto(): ApiRes<string> {
    return ApiRes.success(this.baseDemoService.getHello());
  }

  @Post('/crypto')
  @Public()
  @Crypto(CryptoMethod.AES, CryptoDirection.BOTH)
  postCrypto(@Body() data: string): ApiRes<any> {
    // 由于使用了 @Crypto 装饰器，data 已经被自动解密
    return ApiRes.success({
      receivedData: data,
      timestamp: new Date().toISOString(),
    });
  }

  @Post('upload')
  @Public()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '文件上传' })
  @ApiResponseDoc({ type: String, isArray: true })
  async uploadFiles(@Req() req: FastifyRequest) {
    /**
     * fastify/multipart
     * fastify有几种文件上传中间件,单总体来说都谈不上好用
     * 很多第三方中间件会选择用decorator来实现,但经过考虑还是用最简单的fastify/multipart
     * https://github.com/fastify/fastify-multipart
     * 此处仅给出最简单使用案例,具体业务逻辑自行拓展
     */
    const parts = req.files();
    const formFields: Record<string, any> = {};
    const uploadPromises = [];

    const today = new Date();
    const date = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const baseDir = '.file';
    const targetDir = `${baseDir}/pic/application/${date}`;
    await fs.mkdir(targetDir, { recursive: true });

    for await (const part of parts) {
      if (part.fields) {
        Object.entries(part.fields).forEach(([key, value]) => {
          if (
            value &&
            'type' in value &&
            value.type === 'field' &&
            'value' in value
          ) {
            formFields[key] = value.value;
          }
        });
      }

      const fileBuffer = await part.toBuffer();
      const md5 = createHash('md5')
        .update(new Uint8Array(fileBuffer))
        .digest('hex');
      const extension = part.filename.split('.').pop();
      const timestamp = new Date().getTime();
      const random = Math.random().toString(36).substring(2, 15);
      const fileName = `${md5}-${timestamp}-${random}.${extension}`;
      const filePath = `${targetDir}/${fileName}`;
      const relativePath = filePath;

      uploadPromises.push(
        fs.writeFile(filePath, fileBuffer).then(() => ({ path: relativePath })),
      );
    }

    const results = await Promise.all(uploadPromises);

    if (results.length === 0) {
      return ApiRes.error(400, 'No files uploaded.');
    }

    console.log('Form fields:', formFields);

    const paths = results.map((result) => result.path);
    return ApiRes.success({
      files: paths,
      fields: formFields,
    });
  }

  @Get('cache')
  @UseInterceptors(CacheInterceptor)
  @Public()
  @ApiOperation({ summary: '缓存测试' })
  @ApiResponseDoc({ type: String })
  async cache() {
    await this.cacheManager.set('key', 'hello cache');
    return this.cacheManager.get('key');
  }
}
