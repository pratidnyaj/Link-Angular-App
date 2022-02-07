import { CollaboratorsModule } from "./collaborators.module";


describe('collaboratorsModule', () => {
  let collaboratorsModule: CollaboratorsModule;

  beforeEach(() => {
    collaboratorsModule = new CollaboratorsModule();
  });

  it('should create an instance', () => {
    expect(collaboratorsModule).toBeTruthy();
  });
});
