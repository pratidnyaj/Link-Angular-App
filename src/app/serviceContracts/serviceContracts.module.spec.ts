import { ServiceContractsModule } from "./serviceContracts.module";



describe('serviceContractsModule', () => {
  let serviceContractsModule: ServiceContractsModule;

  beforeEach(() => {
    serviceContractsModule = new ServiceContractsModule();
  });

  it('should create an instance', () => {
    expect(serviceContractsModule).toBeTruthy();
  });
});
