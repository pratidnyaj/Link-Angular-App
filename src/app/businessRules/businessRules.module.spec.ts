import { BusinessRulesModule } from "./businessRules.module";
describe('businessRulesModule', () => {
  let businessRulesModule: BusinessRulesModule;

  beforeEach(() => {
    businessRulesModule = new BusinessRulesModule();
  });

  it('should create an instance', () => {
    expect(businessRulesModule).toBeTruthy();
  });
});
