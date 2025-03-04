import { Test, TestingModule } from '@nestjs/testing';
import { DutyService } from './duty.service';

describe('DutyService', () => {
  let service: DutyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DutyService],
    }).compile();

    service = module.get<DutyService>(DutyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
